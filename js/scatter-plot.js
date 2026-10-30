/* load data and render scatter plot: star rating vs energy consumption */
d3.csv("data/Ex5_TV_energy.csv", d => ({
    star2: +d.star2,
    energy_consumpt: +d.energy_consumpt,
    brand: d.brand
})).then(data => {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const viewW = 500, viewH = 350;
    const width = viewW - margin.left - margin.right;
    const height = viewH - margin.top - margin.bottom;

    const svg = d3.select("#scatter-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .style("border", "1px solid #e2e8f0")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star2) || 6])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy_consumpt) || 1000])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .call(d3.axisLeft(yScale));

    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.star2))
        .attr("cy", d => yScale(d.energy_consumpt))
        .attr("r", 4)
        .attr("fill", "#3b82f6")
        .attr("opacity", 0.6);

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Star Rating (Star2)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Energy Consumption (kWh)");
}).catch(err => console.error("Error loading scatter plot data:", err));