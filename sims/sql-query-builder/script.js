// ── Sample Database ──────────────────────────────────────────────────────────

const DB = {
    Customers: {
        columns: ['customer_id', 'name', 'email', 'city'],
        pk: 'customer_id',
        rows: [
            [1, 'Alice Chen', 'alice@example.com', 'Seattle'],
            [2, 'Bob Martinez', 'bob@example.com', 'Austin'],
            [3, 'Carol Davis', 'carol@example.com', 'Seattle'],
            [4, 'Dan Wilson', 'dan@example.com', 'Denver'],
            [5, 'Eve Johnson', 'eve@example.com', 'Austin']
        ]
    },
    Orders: {
        columns: ['order_id', 'customer_id', 'product_id', 'quantity', 'order_date'],
        pk: 'order_id',
        rows: [
            [101, 1, 201, 2, '2026-01-15'],
            [102, 2, 203, 1, '2026-01-18'],
            [103, 1, 202, 1, '2026-01-20'],
            [104, 3, 201, 3, '2026-01-22'],
            [105, 5, 204, 2, '2026-02-01'],
            [106, 4, 202, 1, '2026-02-05']
        ]
    },
    Products: {
        columns: ['product_id', 'product_name', 'category', 'price'],
        pk: 'product_id',
        rows: [
            [201, 'Wireless Mouse', 'Electronics', 29.99],
            [202, 'USB-C Hub', 'Electronics', 49.99],
            [203, 'Notebook Set', 'Office', 12.99],
            [204, 'Desk Lamp', 'Office', 34.99]
        ]
    }
};

// Join relationships
const JOINS = {
    'Customers': [
        { table: 'Orders', on: ['customer_id', 'customer_id'], label: 'Orders ON Customers.customer_id = Orders.customer_id' }
    ],
    'Orders': [
        { table: 'Customers', on: ['customer_id', 'customer_id'], label: 'Customers ON Orders.customer_id = Customers.customer_id' },
        { table: 'Products', on: ['product_id', 'product_id'], label: 'Products ON Orders.product_id = Products.product_id' }
    ],
    'Products': [
        { table: 'Orders', on: ['product_id', 'product_id'], label: 'Orders ON Products.product_id = Orders.product_id' }
    ]
};

// Example queries
const EXAMPLES = [
    {
        name: 'All Customers',
        from: 'Customers', join: '', select: '*',
        whereCol: '', whereOp: '=', whereVal: '',
        orderCol: '', orderDir: 'ASC'
    },
    {
        name: 'Seattle Customers',
        from: 'Customers', join: '', select: ['name', 'email'],
        whereCol: 'city', whereOp: '=', whereVal: 'Seattle',
        orderCol: 'name', orderDir: 'ASC'
    },
    {
        name: 'Orders Over Qty 1',
        from: 'Orders', join: '', select: ['order_id', 'customer_id', 'quantity'],
        whereCol: 'quantity', whereOp: '>', whereVal: '1',
        orderCol: 'quantity', orderDir: 'DESC'
    },
    {
        name: 'Products Under $40',
        from: 'Products', join: '', select: ['product_name', 'price'],
        whereCol: 'price', whereOp: '<', whereVal: '40',
        orderCol: 'price', orderDir: 'ASC'
    },
    {
        name: 'Customer Orders (JOIN)',
        from: 'Orders', join: 'Customers ON Orders.customer_id = Customers.customer_id',
        select: ['name', 'order_id', 'order_date'],
        whereCol: '', whereOp: '=', whereVal: '',
        orderCol: 'order_date', orderDir: 'DESC'
    },
    {
        name: 'Order Details (JOIN)',
        from: 'Orders', join: 'Products ON Orders.product_id = Products.product_id',
        select: ['order_id', 'product_name', 'quantity', 'price'],
        whereCol: '', whereOp: '=', whereVal: '',
        orderCol: 'order_id', orderDir: 'ASC'
    }
];

// ── DOM refs ────────────────────────────────────────────────────────────────

const fromSel    = document.getElementById('from-select');
const joinSel    = document.getElementById('join-select');
const selectDiv  = document.getElementById('select-checkboxes');
const whereCol   = document.getElementById('where-col');
const whereOp    = document.getElementById('where-op');
const whereVal   = document.getElementById('where-val');
const orderCol   = document.getElementById('orderby-col');
const orderDir   = document.getElementById('orderby-dir');
const sqlDisplay = document.getElementById('sql-display');
const runBtn     = document.getElementById('run-btn');
const clearBtn   = document.getElementById('clear-btn');
const resultsSec = document.getElementById('results-section');
const resultsDiv = document.getElementById('results-table');
const rowCount   = document.getElementById('row-count');
const errorSec   = document.getElementById('error-section');
const errorMsg   = document.getElementById('error-msg');
const exBtnDiv   = document.getElementById('example-buttons');

// ── Render Database Tables ──────────────────────────────────────────────────

function renderDBTables() {
    const container = document.getElementById('db-tables');
    container.innerHTML = '';
    for (const [tname, tdata] of Object.entries(DB)) {
        const div = document.createElement('div');
        div.className = 'db-table';
        div.id = 'dbtable-' + tname;

        const header = document.createElement('div');
        header.className = 'db-table-name';
        header.textContent = tname + ' ';
        const badge = document.createElement('span');
        badge.className = 'pk-badge';
        badge.textContent = 'PK: ' + tdata.pk;
        header.appendChild(badge);
        div.appendChild(header);

        const table = document.createElement('table');
        table.className = 'data-table';
        table.id = 'datatable-' + tname;

        const thead = document.createElement('thead');
        const hrow = document.createElement('tr');
        tdata.columns.forEach(c => {
            const th = document.createElement('th');
            th.textContent = c;
            hrow.appendChild(th);
        });
        thead.appendChild(hrow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        tdata.rows.forEach((row, ri) => {
            const tr = document.createElement('tr');
            tr.id = 'row-' + tname + '-' + ri;
            row.forEach(val => {
                const td = document.createElement('td');
                td.textContent = val;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        div.appendChild(table);
        container.appendChild(div);
    }
}

// ── p5.js ER Diagram ────────────────────────────────────────────────────────

let erSketch = function(p) {
    const W = 390, H = 140;
    const tables = [
        { name: 'Customers', x: 60, y: 70 },
        { name: 'Orders', x: 195, y: 70 },
        { name: 'Products', x: 330, y: 70 }
    ];
    const relations = [
        { from: 0, to: 1, label: 'customer_id' },
        { from: 1, to: 2, label: 'product_id' }
    ];

    p.setup = function() {
        p.createCanvas(W, H);
        p.textFont('sans-serif');
        p.noLoop();
    };

    p.draw = function() {
        p.background(250, 252, 255);

        // Draw edges
        p.stroke(70, 180, 200);
        p.strokeWeight(2);
        relations.forEach(r => {
            const a = tables[r.from], b = tables[r.to];
            p.line(a.x, a.y, b.x, b.y);
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 12;
            p.noStroke();
            p.fill(127);
            p.textSize(9);
            p.textAlign(p.CENTER);
            p.text(r.label, mx, my);
            p.stroke(70, 180, 200);
            p.strokeWeight(2);
        });

        // Draw nodes
        tables.forEach(t => {
            p.noStroke();
            p.fill(30, 75, 105);
            p.ellipse(t.x, t.y, 50, 50);
            p.fill(255);
            p.textSize(10);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(t.name, t.x, t.y);
        });

        // Cardinality labels
        p.noStroke();
        p.fill(100);
        p.textSize(10);
        p.textAlign(p.CENTER);
        // Customers 1──M Orders
        p.text('1', tables[0].x + 20, tables[0].y - 18);
        p.text('M', tables[1].x - 20, tables[1].y - 18);
        // Orders M──1 Products
        p.text('M', tables[1].x + 20, tables[1].y + 24);
        p.text('1', tables[2].x - 20, tables[2].y + 24);
    };
};

new p5(erSketch, 'er-canvas');

// ── Builder Logic ───────────────────────────────────────────────────────────

function getAvailableColumns() {
    const tname = fromSel.value;
    if (!tname) return [];
    let cols = [...DB[tname].columns];
    const joinInfo = getSelectedJoin();
    if (joinInfo) {
        DB[joinInfo.table].columns.forEach(c => {
            if (!cols.includes(c)) cols.push(c);
        });
    }
    return cols;
}

function getSelectedJoin() {
    const val = joinSel.value;
    if (!val) return null;
    // Parse "TableName ON ..."
    const table = val.split(' ON ')[0];
    const fromTable = fromSel.value;
    const joinDefs = JOINS[fromTable];
    if (!joinDefs) return null;
    return joinDefs.find(j => j.table === table) || null;
}

function updateJoinOptions() {
    const tname = fromSel.value;
    joinSel.innerHTML = '<option value="">-- no join --</option>';
    if (tname && JOINS[tname]) {
        JOINS[tname].forEach(j => {
            const opt = document.createElement('option');
            opt.value = j.label;
            opt.textContent = j.label;
            joinSel.appendChild(opt);
        });
    }
}

function updateSelectCheckboxes() {
    const cols = getAvailableColumns();
    selectDiv.innerHTML = '';
    if (cols.length === 0) {
        selectDiv.innerHTML = '<span class="hint">Choose a table first</span>';
        return;
    }
    // "All columns" checkbox
    const allLabel = document.createElement('label');
    const allCb = document.createElement('input');
    allCb.type = 'checkbox';
    allCb.value = '*';
    allCb.checked = true;
    allCb.addEventListener('change', () => {
        if (allCb.checked) {
            selectDiv.querySelectorAll('input[type=checkbox]').forEach(cb => {
                if (cb.value !== '*') cb.checked = false;
            });
        }
        updateSQL();
    });
    allLabel.appendChild(allCb);
    allLabel.append(' All (*)');
    selectDiv.appendChild(allLabel);

    cols.forEach(c => {
        const lbl = document.createElement('label');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = c;
        cb.addEventListener('change', () => {
            if (cb.checked) {
                const allBox = selectDiv.querySelector('input[value="*"]');
                if (allBox) allBox.checked = false;
            }
            updateSQL();
        });
        lbl.appendChild(cb);
        lbl.append(' ' + c);
        selectDiv.appendChild(lbl);
    });
}

function updateWhereAndOrder() {
    const cols = getAvailableColumns();
    whereCol.innerHTML = '<option value="">-- no filter --</option>';
    orderCol.innerHTML = '<option value="">-- no ordering --</option>';
    cols.forEach(c => {
        const o1 = document.createElement('option');
        o1.value = c; o1.textContent = c;
        whereCol.appendChild(o1);
        const o2 = document.createElement('option');
        o2.value = c; o2.textContent = c;
        orderCol.appendChild(o2);
    });
}

// ── SQL Display ─────────────────────────────────────────────────────────────

function getSelectedColumns() {
    const boxes = selectDiv.querySelectorAll('input[type=checkbox]:checked');
    return Array.from(boxes).map(b => b.value);
}

function buildSQL() {
    const tname = fromSel.value;
    if (!tname) return null;

    const cols = getSelectedColumns();
    if (cols.length === 0) return null;

    const joinInfo = getSelectedJoin();
    const wCol = whereCol.value;
    const wOp = whereOp.value;
    const wVal = whereVal.value.trim();
    const oCol = orderCol.value;
    const oDir = orderDir.value;

    let parts = { select: cols, from: tname, join: joinInfo, where: null, order: null };

    if (wCol && wVal) {
        parts.where = { col: wCol, op: wOp, val: wVal };
    }
    if (oCol) {
        parts.order = { col: oCol, dir: oDir };
    }

    return parts;
}

function sqlToHTML(parts) {
    if (!parts) return '<span class="sql-hint">Build your query above...</span>';

    const colStr = parts.select.includes('*')
        ? '<span class="star">*</span>'
        : parts.select.map(c => '<span class="col">' + c + '</span>').join(', ');

    let html = '<span class="kw">SELECT</span> ' + colStr + '\n';
    html += '<span class="kw">FROM</span> <span class="tbl">' + parts.from + '</span>';

    if (parts.join) {
        html += '\n<span class="kw">JOIN</span> <span class="tbl">' + parts.join.table + '</span>';
        html += ' <span class="kw">ON</span> ';
        const onParts = parts.join.on;
        html += '<span class="tbl">' + parts.from + '</span>.<span class="col">' + onParts[0] + '</span>';
        html += ' <span class="op">=</span> ';
        html += '<span class="tbl">' + parts.join.table + '</span>.<span class="col">' + onParts[1] + '</span>';
    }

    if (parts.where) {
        const dispOp = parts.where.op === 'LIKE' ? 'LIKE' : parts.where.op;
        html += '\n<span class="kw">WHERE</span> <span class="col">' + parts.where.col + '</span>';
        html += ' <span class="op">' + escapeHtml(dispOp) + '</span> ';
        html += '<span class="val">\'' + escapeHtml(parts.where.val) + '\'</span>';
    }

    if (parts.order) {
        html += '\n<span class="kw">ORDER BY</span> <span class="col">' + parts.order.col + '</span>';
        html += ' <span class="kw">' + parts.order.dir + '</span>';
    }

    html += '<span class="op">;</span>';
    return html;
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function updateSQL() {
    const parts = buildSQL();
    sqlDisplay.innerHTML = sqlToHTML(parts);
    runBtn.disabled = !parts;
    hideResults();
}

// ── Query Execution ─────────────────────────────────────────────────────────

function executeQuery() {
    const parts = buildSQL();
    if (!parts) return;

    clearHighlights();
    hideError();

    const tname = parts.from;
    const joinInfo = parts.join;

    // Build working rows
    let workingRows = [];
    let workingCols = [];

    if (joinInfo) {
        const leftTable = DB[tname];
        const rightTable = DB[joinInfo.table];
        const leftKeyIdx = leftTable.columns.indexOf(joinInfo.on[0]);
        const rightKeyIdx = rightTable.columns.indexOf(joinInfo.on[1]);

        // Merged column list (avoid duplicate join key)
        workingCols = [...leftTable.columns];
        rightTable.columns.forEach(c => {
            if (!workingCols.includes(c)) workingCols.push(c);
        });

        // Nested loop join
        leftTable.rows.forEach((lr, li) => {
            rightTable.rows.forEach((rr, ri) => {
                if (String(lr[leftKeyIdx]) === String(rr[rightKeyIdx])) {
                    let merged = [...lr];
                    rightTable.columns.forEach((c, ci) => {
                        if (!leftTable.columns.includes(c)) merged.push(rr[ci]);
                    });
                    workingRows.push({ data: merged, leftIdx: li, rightIdx: ri });
                }
            });
        });
    } else {
        const table = DB[tname];
        workingCols = [...table.columns];
        table.rows.forEach((r, i) => {
            workingRows.push({ data: [...r], leftIdx: i, rightIdx: -1 });
        });
    }

    // WHERE filter
    if (parts.where) {
        const colIdx = workingCols.indexOf(parts.where.col);
        if (colIdx === -1) {
            showError('Column "' + parts.where.col + '" not found. Try selecting a different filter column.');
            return;
        }
        workingRows = workingRows.filter(r => {
            return compareValues(r.data[colIdx], parts.where.op, parts.where.val);
        });
    }

    // ORDER BY
    if (parts.order) {
        const colIdx = workingCols.indexOf(parts.order.col);
        if (colIdx !== -1) {
            const dir = parts.order.dir === 'DESC' ? -1 : 1;
            workingRows.sort((a, b) => {
                const va = a.data[colIdx], vb = b.data[colIdx];
                if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
                return String(va).localeCompare(String(vb)) * dir;
            });
        }
    }

    // SELECT projection
    let displayCols;
    if (parts.select.includes('*')) {
        displayCols = workingCols;
    } else {
        displayCols = parts.select.filter(c => workingCols.includes(c));
        if (displayCols.length === 0) {
            showError('None of the selected columns exist in this table combination. Check your SELECT choices.');
            return;
        }
    }

    const colIndices = displayCols.map(c => workingCols.indexOf(c));
    const resultRows = workingRows.map(r => colIndices.map(ci => r.data[ci]));

    // Highlight matching source rows
    workingRows.forEach(r => {
        const trLeft = document.getElementById('row-' + tname + '-' + r.leftIdx);
        if (trLeft) trLeft.classList.add('highlight');
        if (joinInfo && r.rightIdx >= 0) {
            const trRight = document.getElementById('row-' + joinInfo.table + '-' + r.rightIdx);
            if (trRight) trRight.classList.add('highlight');
        }
    });

    showResults(displayCols, resultRows);
}

function compareValues(cellVal, op, filterVal) {
    // Try numeric comparison
    const numCell = Number(cellVal);
    const numFilter = Number(filterVal);
    const bothNumeric = !isNaN(numCell) && !isNaN(numFilter) && filterVal !== '';

    switch (op) {
        case '=':
            return String(cellVal).toLowerCase() === filterVal.toLowerCase();
        case '!=':
            return String(cellVal).toLowerCase() !== filterVal.toLowerCase();
        case '>':
            return bothNumeric ? numCell > numFilter : String(cellVal) > filterVal;
        case '<':
            return bothNumeric ? numCell < numFilter : String(cellVal) < filterVal;
        case '>=':
            return bothNumeric ? numCell >= numFilter : String(cellVal) >= filterVal;
        case '<=':
            return bothNumeric ? numCell <= numFilter : String(cellVal) <= filterVal;
        case 'LIKE':
            // Simple LIKE: % at start/end
            let pattern = filterVal.replace(/%/g, '.*');
            try {
                return new RegExp('^' + pattern + '$', 'i').test(String(cellVal));
            } catch (e) {
                return false;
            }
        default:
            return false;
    }
}

// ── Results Display ─────────────────────────────────────────────────────────

function showResults(cols, rows) {
    resultsSec.style.display = 'block';
    rowCount.textContent = '(' + rows.length + ' row' + (rows.length !== 1 ? 's' : '') + ')';

    let html = '<table class="result-table"><thead><tr>';
    cols.forEach(c => { html += '<th>' + c + '</th>'; });
    html += '</tr></thead><tbody>';

    if (rows.length === 0) {
        html += '<tr><td colspan="' + cols.length + '" style="text-align:center;color:#999;padding:12px;">No matching rows</td></tr>';
    } else {
        rows.forEach(r => {
            html += '<tr>';
            r.forEach(v => { html += '<td>' + (v !== undefined ? v : '') + '</td>'; });
            html += '</tr>';
        });
    }
    html += '</tbody></table>';
    resultsDiv.innerHTML = html;
}

function hideResults() {
    resultsSec.style.display = 'none';
    resultsDiv.innerHTML = '';
    clearHighlights();
}

function clearHighlights() {
    document.querySelectorAll('tr.highlight').forEach(tr => tr.classList.remove('highlight'));
}

function showError(msg) {
    errorSec.style.display = 'block';
    errorMsg.textContent = msg;
}

function hideError() {
    errorSec.style.display = 'none';
}

// ── Event Wiring ────────────────────────────────────────────────────────────

fromSel.addEventListener('change', () => {
    updateJoinOptions();
    joinSel.value = '';
    updateSelectCheckboxes();
    updateWhereAndOrder();
    updateSQL();
});

joinSel.addEventListener('change', () => {
    updateSelectCheckboxes();
    updateWhereAndOrder();
    updateSQL();
});

whereCol.addEventListener('change', updateSQL);
whereOp.addEventListener('change', updateSQL);
whereVal.addEventListener('input', updateSQL);
orderCol.addEventListener('change', updateSQL);
orderDir.addEventListener('change', updateSQL);

runBtn.addEventListener('click', executeQuery);

clearBtn.addEventListener('click', () => {
    fromSel.value = '';
    joinSel.innerHTML = '<option value="">-- no join --</option>';
    selectDiv.innerHTML = '<span class="hint">Choose a table first</span>';
    whereCol.innerHTML = '<option value="">-- no filter --</option>';
    whereVal.value = '';
    orderCol.innerHTML = '<option value="">-- no ordering --</option>';
    orderDir.value = 'ASC';
    updateSQL();
    hideResults();
    hideError();
    clearHighlights();
});

// ── Example Buttons ─────────────────────────────────────────────────────────

function loadExample(ex) {
    fromSel.value = ex.from;
    updateJoinOptions();
    joinSel.value = ex.join || '';
    updateSelectCheckboxes();
    updateWhereAndOrder();

    // Set SELECT checkboxes
    const boxes = selectDiv.querySelectorAll('input[type=checkbox]');
    boxes.forEach(cb => { cb.checked = false; });
    if (ex.select === '*') {
        const allBox = selectDiv.querySelector('input[value="*"]');
        if (allBox) allBox.checked = true;
    } else {
        ex.select.forEach(col => {
            const cb = selectDiv.querySelector('input[value="' + col + '"]');
            if (cb) cb.checked = true;
        });
    }

    whereCol.value = ex.whereCol || '';
    whereOp.value = ex.whereOp || '=';
    whereVal.value = ex.whereVal || '';
    orderCol.value = ex.orderCol || '';
    orderDir.value = ex.orderDir || 'ASC';

    updateSQL();
    hideError();
    executeQuery();
}

EXAMPLES.forEach(ex => {
    const btn = document.createElement('button');
    btn.className = 'example-btn';
    btn.textContent = ex.name;
    btn.addEventListener('click', () => loadExample(ex));
    exBtnDiv.appendChild(btn);
});

// ── Init ────────────────────────────────────────────────────────────────────

renderDBTables();
updateSQL();
