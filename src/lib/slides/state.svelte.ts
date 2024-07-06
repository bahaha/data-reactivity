const jsReactivity = `    const input = document.getElementById('name');
    const h3 = document.querySelector('h3');
    function handleInput(evt) {
        h3.innerText = \`Hey \${evt.target.value}, great job!\`;
    }
    input.addEventListener('change', handleInput);
`;

function createDemoState() {
	let name = $state('CC');
	const greeting = $derived(`Hey ${name}, great job!`);

	const markup = $derived(`    <form>
        <fieldset>
            <label for="name">Name</label>
            <input id="name" type="text" value="${name}" />
        </fieldset>
    </form>
    <h3>${greeting}<h3>
    `);

	const vDomReactivity = $derived(`let name = ''; let vDOM = createVDOM(); let prevVDOM; let elems;
function handle(evt) { name = evt.target.value; }
function createVDOM() { return [ ["input", name, handle], ["h3", \`Hey \${name}, great job!\`] ] }
function updateDOM() {
    if (!elems) {
        elems = vDOM.map(convert);
        document.body.append(...elems);
        return;
    }
    prevVDOM = [...elems];
    vDOM = createVDOM();
    findDiff(prevVDOM, vDOM);
}
function convert(props) {
    const el = document.createElement(props[0]);
    update(el, props);
    return el;
}
function update(el, props) {
    el.value = props[1];
    el.innerText = props[2];
    el.onchange = props[2];
}
function findDiff(prev, curr) {
    for (let i = 0; i < curr.length; i++) {
        if (JSON.stringify(prev[i])) !== JSON.stringify(curr[i])) { // WHO
            update(curr, curr[i]) // WHAT
        }
    }
}
setInterval(updateDOM, 16); // WHEN
`);

	return {
		jsReactivity,
		get vDomReactivity() {
			return vDomReactivity;
		},
		get markup() {
			return markup;
		},
		get greeting() {
			return greeting;
		},
		get name() {
			return name;
		},
		set name(val) {
			name = val;
		}
	};
}

export default createDemoState();
