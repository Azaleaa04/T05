/* load data and render line chart: historical spot power prices from 1998 to 2024 */
d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => ({
    year: +d.Year,
    avgPrice: +d["Average Price (notTas-Snowy)"]
})).then(data => {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const viewW = 500, viewH = 350;
    const width = viewW - margin.left - margin.right;
    const height = viewH - margin.top - margin.bottom;

    const svg = d3.select("#line-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("border", "1px solid #e2e8f0")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.avgPrice) * 1.1])
        .range([height, 0]);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
    svg.append("g").call(d3.axisLeft(yScale));

    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.avgPrice));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#f59e0b")
        .attr("stroke-width", 2.5)
        .attr("d", line);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Year (1998 - 2024)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Average Price ($ / MWh)");
}).catch(err => console.error("Error loading spot prices data:", err));