let navbarList = document.querySelector("#navigation_list");
const sections = document.querySelectorAll("section");



//this Function willcheck if an element is in viewport or not
function isInViewport(elem) {
	var distance = elem.getBoundingClientRect();

	return (
		distance.top >= -250 &&
		distance.left >= 0 &&
		distance.bottom <= (1.3 * window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};


function deactivateSections() {
    sections.forEach((element)=>{
        element.classList.remove("your-active-class", "active");
    });
}

function deactivateNavLinks() {
    let navbarAnchors = document.querySelectorAll(".navigation_hyperlink");
    navbarAnchors.forEach((element)=>{
        element.classList.remove("active-nav");
    });
}


// Build the navigation here
window.addEventListener('load', buildNavbar())


function activateCurrentSection(currentSection) {
    currentSection.classList.add("your-active-class", "active");

    deactivateNavLinks();
    activateNavLinks(currentSection.getAttribute('id'));
}

function activateNavLinks(currentSectionId) {
    let navbarAnchors = document.querySelectorAll(".navigation_hyperlink");
    
        navbarAnchors.forEach((element)=>{
            if(element.getAttribute('href') == `#${currentSectionId}`) {
                element.classList.add("active-nav");
            }
        });
}


function scrollToSectionOnClick() {
    let navbarAnchors = document.querySelectorAll(".navigation_hyperlink");
    navbarAnchors.forEach((element) => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(element.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}




function buildNavbar() {
	sections.forEach((element)=>{
	    let listItem = document.createElement("li");
	    listItem.classList.add("navbar__list__item");
    	let sectionName = element.getAttribute("data-nav");
    	let currentSectionId = element.getAttribute("id");
        listItem.innerHTML = `<a href="#${currentSectionId}" class="navigation_hyperlink">${sectionName}</a>`;
        navbarList.appendChild(listItem);
    });
}


scrollToSectionOnClick();


window.addEventListener('scroll', function (event) {
	event.preventDefault();
	
    sections.forEach((element) => {
        
        if (isInViewport(element)) {
            deactivateSections();
            activateCurrentSection(element);
            
        } else if(window.scrollY==0) {
            deactivateSections();
            deactivateNavLinks();
            
        }
    }, false);
});
