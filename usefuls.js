export function setAttributeObject(element, attributeName, object) {
	const objectString = JSON.stringify(object)
	element.setAttribute(attributeName, objectString)
}

export function getAttributeObject(element, attributeName) {
	const objectString = element.getAttribute(attributeName)
	if (objectString) {
		return JSON.parse(objectString)
	} else {
		return null
	}
}

export function debounce(func, wait) {
	let timeout
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout)
			func(...args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}
