/* load data and render bar chart: energy by screen technology for 55-inch TVs */
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => ({
    screenTech: d.Screen_Tech,
    energy: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    const margin = { top: 20, right: 30, bottom: 50, left: 80 };
    const viewW = 500, viewH = 350;
    const width = viewW - margin.left - margin.right;
    const height = viewH - margin.top - margin.bottom;

    const svg = d3.select("#bar-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("border", "1px solid #e2e8f0")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy) * 1.1])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.screenTech))
        .range([0, height])
        .padding(0.2);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale));
    svg.append("g").call(d3.axisLeft(yScale));

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d.screenTech))
        .attr("width", d => xScale(d.energy))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#10b981");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Mean Labelled Energy Consumption (kWh/year)");
}).catch(err => console.error("Error loading 55-inch bar chart data:", err));