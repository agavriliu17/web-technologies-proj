const icon = document.querySelector('.search-icon');
const search = document.querySelector('.search-bar');

icon.onclick = function(){
	search.classList.toggle('active');
}