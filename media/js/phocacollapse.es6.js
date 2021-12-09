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

	const btnToggle = document.querySelectorAll(".phCollapseClick");

	// Search all buttons
	btnToggle.forEach(elBtn => {

		// Apply changes to clicked area only
		elBtn.addEventListener('click',(event) => {

			event.preventDefault();

			const targetElement = event.target || event.srcElement;
        	const collapseWrapper = targetElement.parentNode.parentNode;
			const group = collapseWrapper.querySelectorAll('.subform-repeatable-group');

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
					childrenArrray.forEach(function(elChild){
						if (textApplied == 0) {
			
							// elChild.children is child for div.control-group
							// we try to find child label and child input name or textarea value
							if (typeof elChild.children !== 'undefined' && elChild.children[0] && elChild.children[0].classList.contains('control-label')) {
								if(elChild.children[0].querySelector('label') !== 'undefined') {
									
									
			
									let title = elChild.children[0].querySelector('label').textContent;
			
									
									if (elChild.children[1].querySelector('input') !== null && elChild.children[1].querySelector('input').value != '') {
										title = title + ': ' + elChild.children[1].querySelector('input').value;
									} else if (elChild.children[1].querySelector('textarea').textContent != '') {
										title = title + ': ' + elChild.children[1].querySelector('textarea').textContent;
									}
			
									if (title != '') {
			
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
		})
	})
});