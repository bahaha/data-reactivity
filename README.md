# Data Reactivity

In today’s landscape of web development, managing state effectively is crucial across both frontend and backend layers. A finely-tuned reactivity system offers developers a more intuitive way to handle state changes. Think of it like a spreadsheet, where cells are interlinked with formulas. When you update the data in one cell, the related cells update automatically and reliably. This analogy helps us understand how changes propagate in web applications.

We’re going to explore this concept within the realm of frontend development, emphasizing ‘reactivity.’ Reactivity in frameworks, such as React or Vue.js, revolves around updating the UI in response to state changes without manual DOM manipulations. These frameworks use mechanisms like the virtual DOM to manage these updates efficiently. The virtual DOM allows a web application to update only the parts of the real DOM that have actually changed, minimizing performance costs and ensuring a seamless user experience.

By the end of this talk, you’ll have a clearer understanding of how modern frameworks handle data reactivity and why this approach is beneficial for building responsive and efficient web applications.

## Agenda

Our journey will start at the core of browser rendering engines. We’ll uncover how modifying properties within view models leads directly to updates on your screen.

Following this, we’ll broaden our view to include various web frameworks. We’ll compare how frameworks approach data reactivity differently. This comparison will highlight the evolution from traditional DOM manipulation to more direct synchronization techniques, enhancing performance and developer experience.

Our discussion will culminate with a focus on prevalent reactivity patterns, especially the Signal pattern. This pattern is instrumental in how modern frameworks manage state changes efficiently.

Key Takeaways:

1. Sometimes, taking a step back is the first step forward. We can sense this by comparing the different approaches of popular web frameworks.
2. The Signal pattern, a cornerstone of modern web frameworks, has revolutionized our understanding of the frontend ecosystem. Its widespread adoption underscores its transformative impact.

## Rendering Engine

In this demonstration, we explore a web application with a basic form input and a message display. Web developers do not manipulate screen pixels directly; instead, they use HTML to structure content efficiently. This abstraction allows easier interaction with the browser.

Now, how does the browser render this HTML? Internally, the browser employs view models—objects within the rendering engine, typically implemented in C++, that represent the HTML nodes. For instance, in our application, the ‘name’ input and ‘h3’ message are distinct nodes in the DOM. Changes to these view models, such as updating the input value, trigger the browser to refresh the corresponding screen pixels.

To demonstrate reactivity, we’ve added JavaScript that updates the ‘h3’ message in response to changes in the input. This script modifies the properties of JavaScript objects, which are analogous to the C++ view models. These objects serve as a bridge, informing the browser of updates via the DOM API, which then reflects changes on the screen.

However, direct DOM manipulations can often lead to inefficiencies and complexities, especially as applications grow. Developers might face challenges like excessive re-renders, slow performance, and difficulty maintaining state consistency across the UI. Modern web frameworks utilize the virtual DOM strategy to mitigate these issues, which we will delve into in the following slides.

This approach to managing the DOM abstractly helps overcome these common pain points, paving the way for more maintainable and performant web applications.

## Virtual DOM

Let’s explore how modern web frameworks enhance the developer experience and efficiency by abstracting direct DOM manipulations. Traditionally, browsers use a rendering engine that employs view models to manage updates to screen pixels. These view models represent the structural elements of a webpage, much like nodes in a tree, which update the screen when their properties change.

Modern frameworks introduce an additional abstraction layer, similar to a view model, but positioned between your JavaScript code and the DOM API to streamline this process. This layer functions like a virtual DOM, where each JavaScript object, representing a node, maps directly to an HTMLElement in the actual DOM.

The structure of this virtual layer mirrors that of a tree, similar to the DOM itself. Changes made to the properties of these JavaScript objects prompt the framework to manage updates to the actual DOM efficiently, minimizing direct manipulations and reducing costly re-renders.

This setup simplifies the developer’s task and enhances the application’s performance by ensuring that only necessary updates are made to the DOM, thereby optimizing interactions with the rendering engine.

Here, we delve into a practical implementation of the virtual DOM, focusing on key aspects that require careful consideration. One of the central elements is the ‘stack,’ or the reactive state variable, which is crucial for tracking changes.

This implementation performs dirty checks every 16 milliseconds, aligning with typical frame updates in web applications. This process involves constructing a Work-In-Progress (WIP) DOM tree based on the latest state. We then compare this WIP DOM with the current DOM to identify differences and determine which nodes and properties have been modified.

**Interacting with the audience:**

Let’s consider potential optimizations for this virtual DOM implementation:

1. **Conditional Dirty Checks:** Perform dirty checks only when changes are detected in properties, rather than running them periodically.
2. **Efficient Comparisons:** Streamline the comparison process between nodes to reduce computational overhead.
3. **Selective Updates:** Update only the properties that have changed, avoiding unnecessary modifications to the DOM.

These optimizations all aim to enhance efficiency, particularly in how comparisons and updates are handled between the DOM trees. Such improvements are vital for maintaining performance in large-scale web applications.

Let’s delve into how web frameworks optimize DOM updates:

1. **When to Update (WHEN)**:

• **React** employs a strategy where dirty checks are triggered by state or component property changes rather than running periodically. Changes are prioritized and scheduled using browser APIs like requestAnimationFrame or requestIdleCallback to ensure efficient DOM updates.

• **Angular** utilizes Zone.js to monitor changes in the application state caused by various operations, including DOM events, network requests, and scheduled tasks. This is achieved through monkey patching, where Angular patches browser APIs to detect changes automatically.

2. **Who and What to Update (WHO & WHAT)**:

• Both frameworks focus on optimizing which parts of the DOM tree need updating to enhance performance. This is where immutability plays a crucial role, as it simplifies change detection:

• **React** uses shouldComponentUpdate to determine whether a component’s output should be re-rendered. This method can prevent unnecessary renders by comparing the current and new states or props.

• **Angular** leverages ChangeDetectionStrategy.OnPush, which marks a component to be checked only if its input properties change via reference comparison, reducing the frequency and scope of change detection cycles.

**Optimization Costs**:

• In React, optimization involves setting specific rules to efficiently determine which nodes need updates, significantly reducing the time complexity of updates.

• Angular’s compiler optimizes change detection by generating specific functions for each component that check only the necessary properties. This approach eliminates the need for creating a work-in-progress DOM tree, enhancing performance but reducing flexibility in property updates, particularly when integrating native HTML elements

## Without V-DOM

Let’s reconsider the virtual DOM’s role in modern web frameworks. Is it truly essential for achieving data reactivity? Or might there be more efficient, intuitive methods available?

The virtual DOM, while powerful, comes with its own set of complexities. It employs dirty checks and optimizations that, although effective in reducing direct DOM manipulations, are not without cost. These processes can be resource-intensive and may not always be the most straightforward approach.

Now, let’s explore an alternative: Svelte. Unlike frameworks that use a virtual DOM, Svelte leverages a compile-time approach to achieve data reactivity. This means Svelte compiles your application to highly efficient imperative code that surgically updates the DOM when the state of the app changes. This approach eliminates the need for a virtual DOM altogether, reducing overhead and potentially increasing performance.

By comparing these methodologies, we aim to understand whether the virtual DOM is always the best solution or if newer, compiler-based frameworks like Svelte offer a more optimized path to reactivity.

We use the same example as we mentioned before, and we are not going too deep with the syntax of the Svelte template. But you could find the state of the application, which is the variable of name, and a greeting message needed to update when the name changes.

Let’s delve into the inner workings of the JavaScript functions produced by Svelte for this component. The process starts with the instance function, which establishes a responsive context for managing the component's state. This function, acting as a factory, initializes state variables and connects handlers that update these variables when user interactions take place.

Subsequently, the create_fragment function assumes a crucial role in rendering and updating the component’s DOM. It directly manipulates DOM elements based on the current state to ensure that the webpage reflects the most recent data. Upon the component's mounting, it links event handlers that modify state variables, such as the input handler which updates the name variable.

Importantly, during the lifecycle of the component, Svelte tracks which pieces of state have changed—referred to as being ‘dirty’. It employs efficient conditional checks to ascertain whether specific DOM updates are required. For instance, if the name variable is dirty, Svelte only updates the relevant parts of the DOM associated with this variable. This selective updating mechanism eliminates the need for a virtual DOM, thereby enhancing performance by minimizing unnecessary DOM manipulations.

With these optimized functions, Svelte streamlines development and improves performance by directly updating the DOM only where changes occur, thereby expediting the process and utilizing resources more efficiently.

## Observer Pattern

In the next section, we will explore the common pattern that comes in data reactivity implementations with the same example application we discussed before.

Like the RxJS adopted by Angular, the observer pattern introduces observables, subscribers, and operators. Let’s delve into the straightforward implementation from scratch. We use variables in the closure to manage the state and its subscribers. When a subscriber subscribe to this observable, then it’s intuitive, we add the subscriber function to the subscribers set and return a cleanup function to unsubscribe. And the next function is intuitive too, when a new value was emitted, the observable should notice all the subscribers the change. Last, the map operator, it is also a observable that subscribe to the original observable for listening the value change, and it do a transform again by running the map function with the latest emitted value.

Let’s make some definition within the observable pattern for later use:

- Signal: an event emitter that manage the state
- Reaction: a handler that listen on the value changes, it could be logs to the console, or do DOM manipulations, …etc.
- Derivation: it also a signal too, the derivation value will be updated automatically when the signal value changes
