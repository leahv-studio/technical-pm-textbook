let mode = 'write';

function build() {
    const area = document.getElementById('arch-area');
    area.innerHTML = `
        <div class="arch-layout">
            <div class="node" id="node-app">
                <div class="node-box" id="box-app">
                    <div class="node-icon">\u{1F4F1}</div>
                    <div class="node-label">Application</div>
                    <div class="node-sublabel">Client / API</div>
                </div>
            </div>

            <div class="connection" id="conn-write">
                <div class="conn-label">Write Path</div>
                <div class="conn-line" id="line-write">
                    <div class="pulse"></div>
                </div>
            </div>

            <div class="node" id="node-primary">
                <div class="node-box" id="box-primary">
                    <div class="node-icon">\u{1F4BE}</div>
                    <div class="node-label">Primary DB</div>
                    <div class="node-sublabel">Leader / Writer</div>
                </div>
            </div>

            <div class="connection" id="conn-sync">
                <div class="conn-label">Replication</div>
                <div class="conn-line" id="line-sync">
                    <div class="pulse"></div>
                </div>
            </div>

            <div class="sync-section">
                <div class="replicas-group">
                    <div class="node" id="node-replica1">
                        <div class="node-box" id="box-replica1">
                            <div class="node-icon">\u{1F4C2}</div>
                            <div class="node-label">Read Replica 1</div>
                            <div class="node-sublabel">Follower</div>
                        </div>
                    </div>
                    <div class="node" id="node-replica2">
                        <div class="node-box" id="box-replica2">
                            <div class="node-icon">\u{1F4C2}</div>
                            <div class="node-label">Read Replica 2</div>
                            <div class="node-sublabel">Follower</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="connection" id="conn-read">
                <div class="conn-label">Read Path</div>
                <div class="conn-line" id="line-read">
                    <div class="pulse"></div>
                </div>
            </div>

            <div class="node" id="node-app-read">
                <div class="node-box" id="box-app-read">
                    <div class="node-icon">\u{1F4F1}</div>
                    <div class="node-label">Application</div>
                    <div class="node-sublabel">Reader</div>
                </div>
            </div>
        </div>
    `;

    updateView();
    buildMetrics();
}

function updateView() {
    // Reset all
    document.querySelectorAll('.node-box').forEach(b => {
        b.className = 'node-box';
    });
    document.querySelectorAll('.node').forEach(n => n.classList.remove('dimmed'));
    document.querySelectorAll('.connection').forEach(c => c.classList.remove('dimmed'));
    document.querySelectorAll('.conn-line').forEach(l => {
        l.className = 'conn-line';
    });

    if (mode === 'write') {
        // Highlight write path
        document.getElementById('box-app').classList.add('active-write');
        document.getElementById('box-primary').classList.add('active-write');
        document.getElementById('box-replica1').classList.add('active-sync');
        document.getElementById('box-replica2').classList.add('active-sync');
        document.getElementById('line-write').classList.add('active-write');
        document.getElementById('line-sync').classList.add('active-sync');

        // Dim read path
        document.getElementById('conn-read').classList.add('dimmed');
        document.getElementById('node-app-read').classList.add('dimmed');
    } else {
        // Highlight read path
        document.getElementById('box-app-read').classList.add('active-read');
        document.getElementById('box-replica1').classList.add('active-read');
        document.getElementById('box-replica2').classList.add('active-read');
        document.getElementById('line-read').classList.add('active-read');

        // Dim write path
        document.getElementById('conn-write').classList.add('dimmed');
        document.getElementById('node-app').classList.add('dimmed');
        document.getElementById('conn-sync').classList.add('dimmed');
        document.getElementById('node-primary').classList.add('dimmed');
    }

    buildMetrics();
}

function buildMetrics() {
    const bar = document.getElementById('metrics-bar');
    if (mode === 'write') {
        bar.innerHTML = `
            <div class="metric">
                <div class="metric-value">~5ms</div>
                <div class="metric-label">Write Latency</div>
            </div>
            <div class="metric">
                <div class="metric-value">1,000/s</div>
                <div class="metric-label">Write Throughput</div>
            </div>
            <div class="metric">
                <div class="metric-value">~50ms</div>
                <div class="metric-label">Replication Lag</div>
            </div>
            <div class="metric">
                <div class="metric-value">1 node</div>
                <div class="metric-label">Write Target</div>
            </div>
        `;
    } else {
        bar.innerHTML = `
            <div class="metric">
                <div class="metric-value">~2ms</div>
                <div class="metric-label">Read Latency</div>
            </div>
            <div class="metric">
                <div class="metric-value">10,000/s</div>
                <div class="metric-label">Read Throughput</div>
            </div>
            <div class="metric">
                <div class="metric-value">2 nodes</div>
                <div class="metric-label">Read Replicas</div>
            </div>
            <div class="metric">
                <div class="metric-value">Load Balanced</div>
                <div class="metric-label">Distribution</div>
            </div>
        `;
    }
}

document.getElementById('btn-write').addEventListener('click', () => {
    mode = 'write';
    document.getElementById('btn-write').classList.add('active');
    document.getElementById('btn-read').classList.remove('active');
    updateView();
});

document.getElementById('btn-read').addEventListener('click', () => {
    mode = 'read';
    document.getElementById('btn-read').classList.add('active');
    document.getElementById('btn-write').classList.remove('active');
    updateView();
});

build();
