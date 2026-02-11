const functionalReqs = [
    {
        id: "FR-001",
        text: "Accept search queries up to 200 characters",
        explanation: "The search input field must accept and process text queries with a maximum length of 200 characters, including special characters and Unicode. Queries exceeding this limit should be gracefully truncated with user notification.",
        testing: "Test with queries of varying lengths (0, 1, 100, 200, 201 chars). Verify truncation behavior. Test with special characters, emojis, and multi-byte Unicode characters. Confirm appropriate error messaging."
    },
    {
        id: "FR-002",
        text: "Return results ranked by relevance",
        explanation: "Search results must be ordered using a relevance scoring algorithm that considers keyword match frequency, recency, user behavior signals, and product popularity. The ranking algorithm should be configurable without code changes.",
        testing: "Search for known products and verify they appear in expected order. Test edge cases: misspellings, partial matches, synonym handling. Compare rankings across different query types. A/B test ranking changes."
    },
    {
        id: "FR-003",
        text: "Support filtering by category, price, date",
        explanation: "Users can narrow results using faceted filters: product category (multi-select), price range (min/max slider), and date added (predefined ranges or custom). Filters must be combinable and show result counts per filter option.",
        testing: "Apply each filter individually and in combination. Verify result counts update dynamically. Test edge cases: empty results, single result, maximum filters applied simultaneously. Confirm filter state persists across pagination."
    },
    {
        id: "FR-004",
        text: "Display up to 20 results per page with pagination",
        explanation: "Results are paginated with 20 items per page by default. Users can navigate between pages with numbered pagination controls. The system must display total result count and current page position. Jump-to-page functionality is required for large result sets.",
        testing: "Verify exactly 20 results per page. Test pagination navigation (first, last, next, previous, specific page). Confirm correct total count display. Test with 0, 1, 20, 21, 1000+ results. Verify URL state reflects current page."
    },
    {
        id: "FR-005",
        text: "Show product thumbnail, title, price, rating",
        explanation: "Each search result card must display: a product thumbnail image (with fallback placeholder), product title (truncated with ellipsis if exceeding 2 lines), current price (with sale price styling if applicable), and star rating (1-5 scale with decimal precision).",
        testing: "Verify all four data elements render for each result. Test with missing data (no image, no rating). Confirm price formatting for different currencies. Test title truncation at various viewport widths. Verify image lazy loading."
    }
];

const nonfunctionalReqs = [
    {
        id: "NFR-001",
        text: "Return results within 200ms",
        explanation: "The search service must return results with a p95 latency of 200ms or less, measured from API request receipt to response delivery. This includes query parsing, index lookup, ranking, and serialization. Cold-start latency budget is 500ms.",
        testing: "Load test with realistic query distribution at expected traffic levels. Monitor p50, p95, p99 latencies. Test under normal and peak conditions. Verify performance with large result sets and complex filter combinations. Set up alerting for latency degradation."
    },
    {
        id: "NFR-002",
        text: "Support 10,000 concurrent searches",
        explanation: "The search infrastructure must handle 10,000 simultaneous search requests without degradation. This requires horizontal scaling, connection pooling, and intelligent load balancing. The system should auto-scale based on demand patterns.",
        testing: "Conduct load testing with 10K concurrent virtual users. Ramp up gradually to identify breaking points. Monitor CPU, memory, and network utilization. Verify auto-scaling triggers and response times. Test failover behavior when nodes become unhealthy."
    },
    {
        id: "NFR-003",
        text: "99.9% uptime availability",
        explanation: "The search service must maintain 99.9% availability, allowing maximum 8.76 hours of downtime per year (43.8 minutes/month). This requires redundant infrastructure, health checks, automatic failover, and zero-downtime deployments.",
        testing: "Chaos engineering: randomly terminate instances and verify automatic recovery. Test failover between availability zones. Measure actual uptime over rolling 30-day windows. Verify health check accuracy and alerting thresholds. Simulate dependency failures."
    },
    {
        id: "NFR-004",
        text: "WCAG 2.1 AA accessibility compliance",
        explanation: "All search interface elements must meet WCAG 2.1 Level AA standards. This includes keyboard navigation, screen reader compatibility, sufficient color contrast (4.5:1 minimum), focus indicators, and proper ARIA labels for all interactive elements.",
        testing: "Automated accessibility scanning with axe-core or Lighthouse. Manual testing with screen readers (NVDA, VoiceOver). Keyboard-only navigation testing. Color contrast verification for all text elements. User testing with participants who use assistive technologies."
    },
    {
        id: "NFR-005",
        text: "Encrypted data in transit and at rest",
        explanation: "All search queries, user data, and results must be encrypted using TLS 1.3 in transit and AES-256 at rest. Search indices containing PII must be encrypted. Encryption keys must be rotated quarterly and managed via a dedicated key management service.",
        testing: "Verify TLS 1.3 enforcement (reject lower versions). Scan for unencrypted data stores. Penetration testing for data exposure. Verify key rotation procedures work without downtime. Audit encryption configuration across all environments."
    }
];

let activeCard = null;

function createRequirementCard(req, type, index) {
    const card = document.createElement("div");
    card.className = `req-card ${type}`;
    card.innerHTML = `
        <div class="req-id">${req.id}</div>
        <div class="req-text">${req.text}</div>
    `;

    card.addEventListener("mouseenter", () => {
        showDetail(req, type);
    });

    card.addEventListener("click", () => {
        if (activeCard === card) {
            activeCard.classList.remove("active");
            activeCard = null;
            hideDetail();
        } else {
            if (activeCard) activeCard.classList.remove("active");
            card.classList.add("active");
            activeCard = card;
            showDetail(req, type);
        }
    });

    return card;
}

function showDetail(req, type) {
    const panel = document.getElementById("detail-panel");
    const content = document.getElementById("detail-content");
    const color = type === "functional" ? "#3b82f6" : "#22c55e";
    const label = type === "functional" ? "Functional" : "Non-Functional";

    content.innerHTML = `
        <h4 style="color: ${color}">${req.id} - ${label} Requirement</h4>
        <div class="detail-explanation">${req.explanation}</div>
        <div class="detail-testing">
            <strong>Testing Criteria</strong>
            ${req.testing}
        </div>
    `;

    panel.classList.add("visible");
}

function hideDetail() {
    const panel = document.getElementById("detail-panel");
    panel.classList.remove("visible");
}

function init() {
    const functionalList = document.getElementById("functional-list");
    const nonfunctionalList = document.getElementById("nonfunctional-list");

    functionalReqs.forEach((req, i) => {
        const card = createRequirementCard(req, "functional", i);
        functionalList.appendChild(card);
    });

    nonfunctionalReqs.forEach((req, i) => {
        const card = createRequirementCard(req, "nonfunctional", i);
        nonfunctionalList.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", init);
