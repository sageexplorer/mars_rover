let store = {
    rover: [],
    rovers: ["curiosity","spirit", "opportunity"],
 };
 
 const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store);
 };
 
 const createNavigation = async (link) => {
    url = link.split("#")[1]
    getRover(store, url)
    }
 
 const render = async (root, state) => {
    root.innerHTML = App(state);
 };
 
 // I am only showing 3 records at this time.
 const results = () => {
    const data = store.rover.data.photos.slice(0, 5).map((m, idx) => {
       return `
                 <h2> Name:  ${m.rover.name}</h2>  
                 <p> Status:  ${m.rover.status}</p>  
                 <p> Landing Date:  ${m.rover.landing_date}</p>   
                 <p> Launch Date:  ${m.rover.launch_date}</p>      
                 <img src=${m.img_src} > `;
    });
    return data;
 };
 
 const root = document.getElementById("root");
 // First Pass - Basic Layout
 const App = (state) => {
    return `
         <header></header>
         <main>
     
             <section>
                 <h3>Mars Rovers Pics!</h3>
                 <p> These are the 3 types of Rovers, and their pics.</p>
                 <p>
                     These are the pictures of the rovers. Click on the link to see more about different rovers deployed since 2001
                 </p>
                 <p> ${results()} </p>
             </section>
         </main>
         <footer></footer>
     `;
 };
 
 window.addEventListener("load", (store) => {
    getRover(store)
    render(root, store);
 });
 
 // Pass name of each Rover, and add results to the rover store
 const getRover = async (state, menu) => {
    let { rover } = state;
    const url = {
       url: menu || 'opportunity' // show one category when page is loaded
    };
 
    data = await fetch(`http://localhost:3000/rover`, {
       method: "POST",
       headers: {
          "Content-Type": "application/json;charset=utf-8",
       },
       body: JSON.stringify(url),
    });
    rover = await data.json();
    updateStore(store, { rover });

 };
 