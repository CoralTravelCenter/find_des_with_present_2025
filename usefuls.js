export function setAttributeObject(element, attributeName, object) {
	const objectString = JSON.stringify(object);
	element.setAttribute(attributeName, objectString);
}

export function getAttributeObject(element, attributeName) {
	const objectString = element.getAttribute(attributeName);
	if (objectString) {
		return JSON.parse(objectString);
	} else {
		return null;
	}
}



