// ============================================
// Database Normalization Visualizer
// Chapter 7: Databases and SQL
// ============================================

var CANVAS_H = 420;
var currentStep = 0;
var targetStep = 0;
var animProgress = 1.0; // 0..1 for transition animation

// --- Table Data ---

var UNNORM_HEADERS = ['order_id', 'cust_name', 'cust_email', 'cust_city', 'cust_state', 'items', 'amounts'];
var UNNORM_ROWS = [
    ['101', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR', 'Widget, Gadget', '29.99, 49.99'],
    ['102', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR', 'Gizmo', '19.99'],
    ['103', 'James Lee', 'james@ex.com', 'Austin', 'TX', 'Widget, Gizmo', '29.99, 19.99'],
    ['104', 'Maria Garcia', 'maria@ex.com', 'Austin', 'TX', 'Gadget', '49.99']
];

var NF1_HEADERS = ['order_id', 'line', 'cust_name', 'cust_email', 'cust_city', 'cust_state', 'item', 'amount'];
var NF1_ROWS = [
    ['101', '1', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR', 'Widget', '29.99'],
    ['101', '2', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR', 'Gadget', '49.99'],
    ['102', '1', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR', 'Gizmo', '19.99'],
    ['103', '1', 'James Lee', 'james@ex.com', 'Austin', 'TX', 'Widget', '29.99'],
    ['103', '2', 'James Lee', 'james@ex.com', 'Austin', 'TX', 'Gizmo', '19.99'],
    ['104', '1', 'Maria Garcia', 'maria@ex.com', 'Austin', 'TX', 'Gadget', '49.99']
];

// 2NF: separate orders and order_lines
var NF2_TABLES = [
    {
        name: 'orders',
        headers: ['order_id', 'cust_name', 'cust_email', 'cust_city', 'cust_state'],
        pk: [0],
        rows: [
            ['101', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR'],
            ['102', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR'],
            ['103', 'James Lee', 'james@ex.com', 'Austin', 'TX'],
            ['104', 'Maria Garcia', 'maria@ex.com', 'Austin', 'TX']
        ]
    },
    {
        name: 'order_lines',
        headers: ['order_id', 'line', 'item', 'amount'],
        pk: [0, 1],
        fk: [0],
        rows: [
            ['101', '1', 'Widget', '29.99'],
            ['101', '2', 'Gadget', '49.99'],
            ['102', '1', 'Gizmo', '19.99'],
            ['103', '1', 'Widget', '29.99'],
            ['103', '2', 'Gizmo', '19.99'],
            ['104', '1', 'Gadget', '49.99']
        ]
    }
];

// 3NF: also separate customers
var NF3_TABLES = [
    {
        name: 'customers',
        headers: ['cust_id', 'cust_name', 'cust_email', 'cust_city', 'cust_state'],
        pk: [0],
        rows: [
            ['C1', 'Sarah Chen', 'sarah@ex.com', 'Portland', 'OR'],
            ['C2', 'James Lee', 'james@ex.com', 'Austin', 'TX'],
            ['C3', 'Maria Garcia', 'maria@ex.com', 'Austin', 'TX']
        ]
    },
    {
        name: 'orders',
        headers: ['order_id', 'cust_id'],
        pk: [0],
        fk: [1],
        rows: [
            ['101', 'C1'],
            ['102', 'C1'],
            ['103', 'C2'],
            ['104', 'C3']
        ]
    },
    {
        name: 'order_lines',
        headers: ['order_id', 'line', 'item', 'amount'],
        pk: [0, 1],
        fk: [0],
        rows: [
            ['101', '1', 'Widget', '29.99'],
            ['101', '2', 'Gadget', '49.99'],
            ['102', '1', 'Gizmo', '19.99'],
            ['103', '1', 'Widget', '29.99'],
            ['103', '2', 'Gizmo', '19.99'],
            ['104', '1', 'Gadget', '49.99']
        ]
    }
];

// Highlight colors for duplicate data
var DUP_HIGHLIGHTS = {
    0: [[1, 2, 3, 4]], // unnorm: rows 0,1 share cust data; rows 2,3 share city
    1: [[2, 3, 4, 5]],  // 1NF: all cust columns still duplicated
    2: [[1, 2, 3, 4]],  // 2NF: cust_city and cust_state still in orders
    3: []                // 3NF: no redundancy
};

function setup() {
    var container = document.getElementById('canvas-container');
    var canvas = createCanvas(container.offsetWidth, CANVAS_H);
    canvas.parent('canvas-container');
    textFont('Segoe UI, system-ui, sans-serif');
    setStep(0);
}

function windowResized() {
    var container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, CANVAS_H);
}

function setStep(step) {
    currentStep = step;

    // Update button states
    var btns = ['btn-unnorm', 'btn-1nf', 'btn-2nf', 'btn-3nf'];
    for (var i = 0; i < btns.length; i++) {
        document.getElementById(btns[i]).classList.toggle('active', i === step);
    }

    updateExplanation();
    updateAnomalies();
}
// Make setStep global for onclick
window.setStep = setStep;

function updateExplanation() {
    var badge = document.getElementById('nf-badge');
    var problemBadge = document.getElementById('problem-badge');
    var title = document.getElementById('explanation-title');
    var text = document.getElementById('explanation-text');

    if (currentStep === 0) {
        badge.textContent = 'Unnormalized';
        badge.style.background = '#ef4444';
        problemBadge.textContent = 'Multiple values per cell, heavy redundancy';
        title.textContent = 'Unnormalized Table';
        text.textContent = 'This table stores everything in a single flat structure. The "items" and "amounts" columns contain comma-separated lists \u2014 multiple values crammed into one cell. Customer data (name, email, city, state) is repeated in every order row for the same customer. If Sarah Chen changes her email, you must update multiple rows. Miss one and your data is inconsistent.';
    } else if (currentStep === 1) {
        badge.textContent = '1NF';
        badge.style.background = '#f59e0b';
        problemBadge.textContent = 'Atomic values achieved, but partial dependencies remain';
        title.textContent = 'First Normal Form (1NF)';
        text.textContent = 'Each cell now contains exactly one value \u2014 no more comma-separated lists. Each order line gets its own row with a composite primary key (order_id + line). However, customer data is still duplicated across every row for the same customer. The table has a partial dependency: cust_name, cust_email, cust_city, and cust_state depend only on order_id, not on the full composite key (order_id, line).';
    } else if (currentStep === 2) {
        badge.textContent = '2NF';
        badge.style.background = '#3b82f6';
        problemBadge.textContent = 'Partial dependencies removed, transitive dependencies remain';
        title.textContent = 'Second Normal Form (2NF)';
        text.textContent = 'The table has been split into "orders" and "order_lines." Order line data (item, amount) is separated from order-level data. This removes the partial dependency. However, the orders table still has a transitive dependency: cust_city and cust_state depend on cust_email (which identifies the customer), not directly on order_id. Customer data like Sarah Chen\'s info is still repeated across her two orders.';
    } else {
        badge.textContent = '3NF';
        badge.style.background = '#22c55e';
        problemBadge.textContent = 'All anomalies resolved \u2014 fully normalized';
        title.textContent = 'Third Normal Form (3NF)';
        text.textContent = 'Customer data has been extracted into its own "customers" table with a cust_id primary key. The orders table now references customers via a foreign key (cust_id). Each piece of data is stored exactly once. Sarah Chen\'s email appears in one row in one table \u2014 update it there and every order reflects the change. No update, insert, or delete anomalies remain.';
    }
}

function updateAnomalies() {
    var updateCard = document.getElementById('anomaly-update');
    var insertCard = document.getElementById('anomaly-insert');
    var deleteCard = document.getElementById('anomaly-delete');
    var updateText = document.getElementById('anomaly-update-text');
    var insertText = document.getElementById('anomaly-insert-text');
    var deleteText = document.getElementById('anomaly-delete-text');

    if (currentStep <= 2) {
        updateCard.classList.remove('resolved');
        insertCard.classList.remove('resolved');
        deleteCard.classList.remove('resolved');

        if (currentStep === 0) {
            updateText.textContent = 'If Sarah changes her email, you must update every row with her orders. Miss one row and the data is inconsistent.';
            insertText.textContent = 'You cannot add a new customer until they place an order \u2014 customer data exists only inside order rows.';
            deleteText.textContent = 'If you delete Maria\'s only order (#104), you lose all record that Maria Garcia exists as a customer.';
        } else if (currentStep === 1) {
            updateText.textContent = 'Customer data is still repeated across rows. Changing Sarah\'s email requires updating 3 rows in this table.';
            insertText.textContent = 'Still cannot store a customer without an order. The customer exists only as part of an order row.';
            deleteText.textContent = 'Deleting order #104 still destroys Maria Garcia\'s customer information entirely.';
        } else {
            updateText.textContent = 'Customer data is still in the orders table. Sarah\'s info appears in 2 order rows that must stay synchronized.';
            insertText.textContent = 'A customer without orders still cannot be stored independently \u2014 customer fields live in the orders table.';
            deleteText.textContent = 'Deleting Maria\'s order still removes her customer data from the system.';
        }
    } else {
        updateCard.classList.add('resolved');
        insertCard.classList.add('resolved');
        deleteCard.classList.add('resolved');
        updateText.textContent = 'Resolved: Customer data stored once in the customers table. Update one row, all orders reflect the change.';
        insertText.textContent = 'Resolved: New customers can be added to the customers table before they place any orders.';
        deleteText.textContent = 'Resolved: Deleting an order does not affect customer data. Maria\'s record persists in the customers table.';
    }
}

// --- Drawing ---

function draw() {
    background(245, 247, 250);

    if (currentStep === 0) {
        drawSingleTable('Unnormalized Table', UNNORM_HEADERS, UNNORM_ROWS, null, true);
    } else if (currentStep === 1) {
        drawSingleTable('1NF Table', NF1_HEADERS, NF1_ROWS, [0, 1], false);
    } else if (currentStep === 2) {
        drawMultiTable(NF2_TABLES);
    } else {
        drawMultiTable(NF3_TABLES);
    }
}

function drawSingleTable(title, headers, rows, pkCols, showDupHighlight) {
    var mx = 20;
    var my = 20;
    var colW = (width - 2 * mx) / headers.length;
    var rowH = 24;
    var headerH = 28;

    push();

    // Title
    noStroke();
    fill(80, 100, 120);
    textAlign(LEFT, BOTTOM);
    textSize(12);
    textStyle(BOLD);
    text(title, mx, my - 4);
    textStyle(NORMAL);

    // Header row
    for (var c = 0; c < headers.length; c++) {
        var hx = mx + c * colW;
        var isPk = pkCols && pkCols.indexOf(c) !== -1;

        fill(isPk ? color(245, 158, 11) : color(30, 75, 105));
        noStroke();
        rect(hx, my, colW, headerH);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(9);
        textStyle(BOLD);
        text(headers[c], hx + colW / 2, my + headerH / 2);

        if (isPk) {
            textSize(7);
            textStyle(NORMAL);
            text('PK', hx + colW - 10, my + 8);
        }
    }
    textStyle(NORMAL);

    // Data rows
    for (var r = 0; r < rows.length; r++) {
        var ry = my + headerH + r * rowH;

        for (var c2 = 0; c2 < headers.length; c2++) {
            var cx = mx + c2 * colW;

            // Highlight duplicate data columns
            var isDup = false;
            if (showDupHighlight && currentStep === 0 && c2 >= 1 && c2 <= 4) {
                // Check if this value is duplicated in another row
                for (var r2 = 0; r2 < rows.length; r2++) {
                    if (r2 !== r && rows[r2][c2] === rows[r][c2]) {
                        isDup = true;
                        break;
                    }
                }
            }
            if (!showDupHighlight && currentStep === 1 && c2 >= 2 && c2 <= 5) {
                for (var r3 = 0; r3 < rows.length; r3++) {
                    if (r3 !== r && rows[r3][c2] === rows[r][c2]) {
                        isDup = true;
                        break;
                    }
                }
            }

            // Cell background
            noStroke();
            if (isDup) {
                fill(239, 68, 68, 25);
            } else {
                fill(r % 2 === 0 ? 255 : 248, r % 2 === 0 ? 255 : 250, r % 2 === 0 ? 255 : 252);
            }
            rect(cx, ry, colW, rowH);

            // Cell border
            stroke(220, 225, 230);
            strokeWeight(0.5);
            noFill();
            rect(cx, ry, colW, rowH);

            // Cell text
            noStroke();
            fill(isDup ? color(200, 50, 50) : color(60, 70, 80));
            textAlign(CENTER, CENTER);
            textSize(8.5);
            text(rows[r][c2], cx + colW / 2, ry + rowH / 2);
        }
    }

    // Duplicate legend
    if ((showDupHighlight && currentStep === 0) || (!showDupHighlight && currentStep === 1)) {
        var legY = my + headerH + rows.length * rowH + 12;
        fill(239, 68, 68, 25);
        noStroke();
        rect(mx, legY, 14, 14, 2);
        fill(200, 50, 50);
        textAlign(LEFT, CENTER);
        textSize(9);
        text('Duplicated data (redundancy)', mx + 20, legY + 7);
    }

    pop();
}

function drawMultiTable(tables) {
    var mx = 15;
    var my = 10;
    var gap = 18;
    var rowH = 22;
    var headerH = 26;

    push();

    // Calculate layout: stack tables vertically
    var yOffset = my;

    for (var t = 0; t < tables.length; t++) {
        var tbl = tables[t];
        var colW = Math.min((width - 2 * mx) / tbl.headers.length, 140);
        var tableW = colW * tbl.headers.length;
        var tableX = (width - tableW) / 2;

        // Table name
        noStroke();
        fill(30, 75, 105);
        textAlign(LEFT, BOTTOM);
        textSize(11);
        textStyle(BOLD);
        text(tbl.name, tableX, yOffset);
        textStyle(NORMAL);
        yOffset += 4;

        // Header row
        for (var c = 0; c < tbl.headers.length; c++) {
            var hx = tableX + c * colW;
            var isPk = tbl.pk && tbl.pk.indexOf(c) !== -1;
            var isFk = tbl.fk && tbl.fk.indexOf(c) !== -1;

            if (isPk) {
                fill(245, 158, 11);
            } else if (isFk) {
                fill(59, 130, 246);
            } else {
                fill(30, 75, 105);
            }
            noStroke();
            rect(hx, yOffset, colW, headerH);

            fill(255);
            textAlign(CENTER, CENTER);
            textSize(9);
            textStyle(BOLD);
            text(tbl.headers[c], hx + colW / 2, yOffset + headerH / 2);

            if (isPk) {
                textSize(7);
                textStyle(NORMAL);
                text('PK', hx + colW - 10, yOffset + 8);
            }
            if (isFk) {
                textSize(7);
                textStyle(NORMAL);
                text('FK', hx + colW - 10, yOffset + 8);
            }
        }
        textStyle(NORMAL);
        yOffset += headerH;

        // Data rows
        for (var r = 0; r < tbl.rows.length; r++) {
            // Check for duplicates in 2NF orders table
            var highlightCols = [];
            if (currentStep === 2 && t === 0) {
                // In 2NF orders table, cust data is still duplicated
                for (var cc = 1; cc < tbl.headers.length; cc++) {
                    for (var rr = 0; rr < tbl.rows.length; rr++) {
                        if (rr !== r && tbl.rows[rr][cc] === tbl.rows[r][cc]) {
                            highlightCols.push(cc);
                            break;
                        }
                    }
                }
            }

            for (var c2 = 0; c2 < tbl.headers.length; c2++) {
                var cx = tableX + c2 * colW;
                var isDup = highlightCols.indexOf(c2) !== -1;

                noStroke();
                if (isDup) {
                    fill(239, 68, 68, 25);
                } else {
                    fill(r % 2 === 0 ? 255 : 248, r % 2 === 0 ? 255 : 250, r % 2 === 0 ? 255 : 252);
                }
                rect(cx, yOffset, colW, rowH);

                stroke(220, 225, 230);
                strokeWeight(0.5);
                noFill();
                rect(cx, yOffset, colW, rowH);

                noStroke();
                fill(isDup ? color(200, 50, 50) : color(60, 70, 80));
                textAlign(CENTER, CENTER);
                textSize(8.5);
                text(tbl.rows[r][c2], cx + colW / 2, yOffset + rowH / 2);
            }
            yOffset += rowH;
        }

        // FK arrow annotation
        if (tbl.fk && t > 0) {
            var arrowX = tableX + tableW + 8;
            var arrowY = yOffset - (tbl.rows.length * rowH) / 2;
            fill(59, 130, 246, 180);
            textAlign(LEFT, CENTER);
            textSize(8);
            text('\u2190 FK', arrowX, arrowY);
        }

        yOffset += gap;
    }

    // Legend
    var legY = yOffset;
    noStroke();

    fill(245, 158, 11);
    rect(mx, legY, 12, 12, 2);
    fill(80, 90, 100);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Primary Key', mx + 16, legY + 6);

    fill(59, 130, 246);
    rect(mx + 100, legY, 12, 12, 2);
    fill(80, 90, 100);
    text('Foreign Key', mx + 116, legY + 6);

    if (currentStep === 2) {
        fill(239, 68, 68, 25);
        rect(mx + 200, legY, 12, 12, 2);
        stroke(239, 68, 68, 60);
        strokeWeight(0.5);
        noFill();
        rect(mx + 200, legY, 12, 12, 2);
        noStroke();
        fill(200, 50, 50);
        text('Still duplicated', mx + 216, legY + 6);
    }

    if (currentStep === 3) {
        fill(34, 197, 94);
        textAlign(LEFT, CENTER);
        textSize(9);
        text('\u2713 No redundancy \u2014 each fact stored once', mx + 200, legY + 6);
    }

    pop();
}
