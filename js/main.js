
const catchError = err=>{
	console.log("ERROR:",err.message);
}

const events = ()=>{
	const toggler = document.querySelector(".nav-toggler");
	
	const toggleNavbar = e=>{
		const navList = document.querySelector(".navbar-nav");
		console.log(navList,e.target)
		if (e.target.classList.contains("active")){
			navList.classList.remove("active");
			e.target.classList.remove("active")
		} else {
			navList.classList.add("active");
			e.target.classList.add("active")
		}
	}

	toggler.addEventListener("click",toggleNavbar)
}

const start = async ()=>{
	const Content =await fetch("/documentation-page/js/content.json").then(res=>res.json()).catch(catchError);
	const {headers} = Content;

	const sections = document.querySelectorAll("section");
	const navList = document.querySelector(".nav-list");

	for (let i=0;i<14;i++){
		const title = headers[i].replaceAll("_"," ");
		const navLink = document.createElement("li");
		const link = document.createElement("a");

		link.href=`#${headers[i]}`;
		link.classList.add("nav-link");
		link.textContent = title;
		navLink.classList.add("nav-item");

		navLink.insertAdjacentElement("afterbegin",link);
		navList.insertAdjacentElement("beforeend",navLink);

		sections[i].id = headers[i];
		sections[i].children[0].textContent = title;
	}

	events();
}

start();