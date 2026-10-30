/* load data and render donut chart: energy by screen technology (all sizes) */
d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => ({
    screenTech: d.Screen_Tech,
    energy: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    const viewW = 400, viewH = 350;
    const radius = Math.min(viewW, viewH) / 2 - 40;

    const svg = d3.select("#donut-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("border", "1px solid #e2e8f0")
        .append("g")
        .attr("transform", `translate(${viewW / 2}, ${viewH / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.screenTech))
        .range(["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]);

    const pie = d3.pie().value(d => d.energy);
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);

    svg.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.screenTech))
        .attr("stroke", "white")
        .style("stroke-width", "2px");

    svg.selectAll("text")
        .data(pie(data))
        .join("text")
        .text(d => d.data.screenTech)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("fill", "#fff")
        .style("font-weight", "bold");
}).catch(err => console.error("Error loading donut data:", err));