/*
 * @package Joomla
 * @copyright Copyright (C) 2005 Open Source Matters. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
 *
 * @extension Phoca Collapse System Plugin
 * @copyright Copyright (C) Jan Pavelka www.phoca.cz
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
 */
 
document.addEventListener("DOMContentLoaded", () => { 

	//const btnToggle = document.querySelectorAll(".phCollapseClick");

	// Search all buttons and accept even dynamically created buttons
	document.addEventListener('click',function(event){
				
		// Apply changes to clicked area only
		//if(event.target && event.target.className == 'phCollapseClick'){
		if(event.target && event.target.getAttribute('data-name') == 'phCollapseClick'){		

			//event.preventDefault();
			const targetElement 	= event.target;// || event.srcElement;
        	const collapseWrapper 	= targetElement.parentNode.parentNode;
			const group 			= collapseWrapper.querySelectorAll('.subform-repeatable-group');

			// Remove all titles if added previously by toggle actions
			removeElements = collapseWrapper.querySelectorAll(".ph-collapse-title");
			removeElements.forEach(function(elRemove){ 
				elRemove.remove();
			})

			// If toggle is true - active, then remove all control groups with adding ph-collpse-hidden class
			// But don't hide everything, we need to know at least some title
			// So try to find title from first 
			group.forEach(el => {

				const resultToggle = el.classList.toggle('ph-collapse-hidden');

				if (resultToggle) {
					const children = el.childNodes;// All div.control-group
					const childrenArrray = Array.from(children);

					let textApplied = 0;
					let title = '';
					childrenArrray.forEach(function(elChild){
						if (textApplied == 0) {

							// elChild.children is child for div.control-group
							// we try to find child label and child input name or textarea value
							// 1) without fieldset
							// 2) with fieldset
							if ((typeof elChild.children !== 'undefined' && elChild.children[0] && elChild.children[0].classList.contains('control-label'))
								|| (typeof elChild.children !== 'undefined' && elChild.querySelector('fieldset') &&  elChild.querySelector('fieldset').querySelector('.control-label'))
							) {
								if(elChild.children[0].querySelector('label') !== 'undefined') {

									let titlePrefix = elChild.children[0].querySelector('label').textContent;

									if (titlePrefix.trim() == '' && elChild.children[1].querySelector('label') !== null) {
										// Fieldset
										titlePrefix = elChild.children[1].querySelector('label').textContent;
									}

									if (typeof elChild.children[1] !== 'undefined') {

										if (elChild.children[1].querySelector('input') !== null && elChild.children[1].querySelector('input').value != '') {
											title = titlePrefix + ': ' + elChild.children[1].querySelector('input').value;
										} else if (elChild.children[1].querySelector('textarea') != null && elChild.children[1].querySelector('textarea').textContent != '') {
											title = titlePrefix + ': ' + elChild.children[1].querySelector('textarea').textContent;
										} else if (elChild.children[1].querySelector('select') !== null &&  elChild.children[1].querySelector('select').selectedOptions.length > 0) {
											title = titlePrefix + ': ' + elChild.children[1].querySelector('select').selectedOptions[0].text;
										}
									}

									// Phoca Templates (additional divs in form)
									if (elChild &&
										elChild.children &&
										elChild.children[0] &&
										elChild.children[0].children) {

										// ROW
										if (elChild.children[0].children[3] &&
											elChild.children[0].className == 'phTemplateRow') {
											var inputEl = elChild.children[0].children[3].querySelector('input');

											if (inputEl && inputEl.value !== '') {
												var titleFull = inputEl.value;
												var titleMatch = titleFull.match(/container-[^\s]*/);

												if (titleMatch) {
													title = titlePrefix + ': ' + titleMatch[0];
												}
											}
										}

										// COLUMN
										if (elChild.children[0].children[1] &&
											elChild.children[0].children[1].children &&
											elChild.children[0].children[1].children[1] &&
											elChild.children[0].className == 'phTemplateColumn'){

											var inputEl = elChild.children[0].children[1].children[1].querySelector('input');
											if (inputEl && inputEl.value !== '') {
												title = titlePrefix + ': ' + inputEl.value;
											}
										}
									}

									if (title == '') {
										title = titlePrefix;
									}

									if (title.trim() != '') {

										var div = document.createElement('div');
										div.classList.add("ph-collapse-title");
										div.innerHTML = title.trim();

										el.appendChild(div);
										textApplied = 1;
									}
								}
							}
						}
					});
				}				
			})
		} else if (event.target && event.target.getAttribute('data-name') == 'phCollapseClickMenu'){
			
			const targetElement 	= event.target;// || event.srcElement;
        	const collapseWrapper 	= targetElement.parentNode.parentNode;
			const group 			= collapseWrapper.querySelectorAll('.js-draggable tr');

			group.forEach(el => {
				const resultToggleMenu = el.classList.toggle('ph-collapse-hidden-menu');
			})
		} else if (event.target && event.target.getAttribute('data-name') == 'phCollapseClickArticle'){
			
			const targetElement 	= event.target;// || event.srcElement;
        	const collapseWrapper 	= targetElement.parentNode.parentNode;
			const group 			= collapseWrapper.querySelectorAll('#articleList tr');

			group.forEach(el => {
				const resultToggleMenu = el.classList.toggle('ph-collapse-hidden-article');
			})
		}
	})
});
