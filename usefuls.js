export function getRandomElement(array) {
	if (array.length === 0) {
		return null; // Возвращаем null, если массив пуст
	}

	// Создаем копию массива, чтобы не изменять оригинал
	const shuffledArray = [...array];

	// Перемешиваем элементы массива
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	// Возвращаем следующий элемент из перемешанного массива
	return shuffledArray.shift();
}

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



