// D3 Visualization Code
const margin = {top: 20, right: 30, bottom: 40, left: 40};
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Tooltip setup
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Retention Chart
const retentionData = [
    {year: 2018, pre: 72, post: 78, label: "Initial stabilization efforts"},
    {year: 2019, pre: 75, post: 82, label: "Rent control expansion"},
    {year: 2020, pre: 70, post: 85, label: "Pandemic relief programs"},
    {year: 2021, pre: 68, post: 88, label: "Tenant protection laws"},
    {year: 2022, pre: 65, post: 90, label: "Affordable housing initiatives"}
];

const retentionSvg = d3.select("#retention-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
    .domain(retentionData.map(d => d.year))
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

retentionSvg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

retentionSvg.append("g")
    .call(d3.axisLeft(y));

retentionSvg.selectAll(".bar-pre")
    .data(retentionData)
    .enter().append("rect")
    .attr("class", "bar-pre")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.pre))
    .attr("width", x.bandwidth() / 2)
    .attr("height", d => height - y(d.pre))
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Pre-Intervention: ${d.pre}%<br>${d.label}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition().duration(500).style("opacity", 0);
    });

retentionSvg.selectAll(".bar-post")
    .data(retentionData)
    .enter().append("rect")
    .attr("class", "bar-post")
    .attr("x", d => x(d.year) + x.bandwidth() / 2)
    .attr("y", d => y(d.post))
    .attr("width", x.bandwidth() / 2)
    .attr("height", d => height - y(d.post))
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Post-Intervention: ${d.post}%<br>${d.label}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition().duration(500).style("opacity", 0);
    });

// Affordability Chart
const affordabilityData = [
    {year: 2018, value: 35},
    {year: 2019, value: 40},
    {year: 2020, value: 45},
    {year: 2021, value: 50},
    {year: 2022, value: 55}
];

const affordabilitySvg = d3.select("#affordability-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.value));

affordabilitySvg.append("path")
    .datum(affordabilityData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line)
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Affordability Index: ${d.value}<br>Year: ${d.year}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition().duration(500).style("opacity", 0);
    });

affordabilitySvg.selectAll(".dot")
    .data(affordabilityData)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.value))
    .attr("r", 5)
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Affordability Index: ${d.value}<br>Year: ${d.year}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition().duration(500).style("opacity", 0);
    });

affordabilitySvg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

affordabilitySvg.append("g")
    .call(d3.axisLeft(y));

// Green Space Chart
const greenSpaceData = [
    {year: 2018, value: 120},
    {year: 2019, value: 150},
    {year: 2020, value: 180},
    {year: 2021, value: 210},
    {year: 2022, value: 250}
];

const greenSpaceSvg = d3.select("#green-space-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const area = d3.area()
    .x(d => x(d.year))
    .y0(height)
    .y1(d => y(d.value));

greenSpaceSvg.append("path")
    .datum(greenSpaceData)
    .attr("fill", "#2ca02c")
    .attr("d", area)
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Green Space Area: ${d.value} acres<br>Year: ${d.year}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition().duration(500).style("opacity", 0);
    });

greenSpaceSvg.selectAll(".area-point")
    .data(greenSpaceData)
    .enter().append("circle")
    .attr("class", "area-point")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.value))
    .attr("r", 5)
    .attr("fill", "#2ca02c")
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Green Space Area: ${d.value} acres<br>Year: ${d.year}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition().duration(500).style("opacity", 0);
    });

greenSpaceSvg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

greenSpaceSvg.append("g")
    .call(d3.axisLeft(y));
