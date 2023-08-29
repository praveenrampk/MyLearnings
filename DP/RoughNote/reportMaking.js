(main =_=> {

    const words = `In this period, the first FRP-reinforced concrete bridge deck was built in
    McKinleyville, West Virginia, and the first all-composites vehicular bridge deck was
    built in Russell, Kansas. Composites continue to find applications today.
    Nanomaterials are incorporated into improved fibers and resins used in new
    composites. Nanotechnology began to be used in commercial products in the early
    2000s. Bulk carbon nanotubes can be used as composite reinforcement in polymers
    to improve the mechanical, thermal, and electrical properties of the bulk product.
    
    Nowadays, the composite industry is still evolving, with much of the growth
    now focused around renewable energy. Wind turbine blades, especially, are
    constantly pushing the limits on size and require advanced composite materials, for
    example, the engineers can design to tailor the composite based on the performant
    requirements, making the composite sheet very strong in one direction by aligning
    the fibers that way, but weaker in another direction where strength is not so
    important. The engineers can also select properties such as resistance to heat,
    chemicals, and weathering by choosing an appropriate matrix material. In recent
    years, an increasing environmental consciousness and awareness of the need for
    sustainable development have raised interest in using natural fibers as
    reinforcements in composites to replace synthetic fiber. This chapter seeks to
    provide an overview of the science and technology in relation to the composite
    material, manufacturing process, and utilization.`

    let temp1 = 0, temp2 = 124;
    let common, bool = true;
    
    while(bool) {
        console.log(words.split(' ').slice(temp1, temp2).join(' '));
        console.log('\n\n----------');

        common = temp2;
        temp2 += 124;
        temp1 = common;

        (temp2 >= words.length ? bool = false : bool = true);
    }
})();