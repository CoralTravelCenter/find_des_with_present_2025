import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import './game.settings.js'
import { getAttributeObject, setAttributeObject } from './usefuls.js'

gsap.registerPlugin(CustomEase)

class FindDedGame {
	constructor(hostElement, options = {}) {
		this.options = {
			autoStart: true,
			onReady: () => {},
			onComplete: () => {},
			...options,
		}

		this.animations = {
			hideMoroz: CustomEase.create('myEase', '0.550, 0.085, 0.680, 0.530'),
			showMoroz: CustomEase.create('myEase', '0.600, 0.040, 0.980, 0.335'),
			dedAppear: {
				duration: 0.3,
			},
			dedStay: {
				duration: 2, // Время, в течение которого Дед Мороз остается видимым
			},
			dedDisappear: {
				duration: 0.3,
			},
			intervalBetweenDeds: 1, // Интервал между появлениями Дедов Морозов
		}

		this.host = hostElement
		this.game_container = null
		this.ded_container = null
		this.game_field = null
		this.scoreField = null
		this.present_count = 0
		this.clickDebounceTime = 300
		this.init()
	}

	init() {
		this.generateGameContainer()
		this.generateGameField()
		this.generateHouses()
		this.generateDedContainer()
		this.generateScoreField()
		this.renderDed()
		this.scores()
		this.scoreBoxes()
	}

	generateScoreField() {
		const element = document.createElement('div')
		const presents = document.createElement('div')
		const scoreText = document.createElement('span')
		element.classList.add('score-field')
		presents.classList.add('presents')
		scoreText.classList.add('score-text')
		scoreText.innerHTML = `Подарки: <span data-score></span>/10`
		element.append(scoreText, presents)
		this.game_field.append(element)
		this.scoreField = element
	}

	generateStopButton(interval) {
		const button = document.createElement('button')
		button.setAttribute('data-end-game', true)
		button.textContent = 'Закончить игру и получить скидку'
		button.addEventListener('click', () => {
			clearInterval(interval)
			this.options.onComplete()
		})
		this.game_container.append(button)
	}

	generateGameContainer() {
		this.game_container = document.createElement('div')
		this.game_container.classList.add('game-container')
		this.game_container.setAttribute('data-search-game', true)
		this.host.append(this.game_container)
	}

	generateGameField() {
		this.game_field = document.createElement('div')
		const game_background = document.createElement('div')
		const game_background_img = document.createElement('img')
		game_background_img.src =
			'https://b2ccdn.coral.ru/content/landing-pages/ny-2025-gaming-host/libs/games/phase0/BG.png'
		game_background.classList.add('game-background')
		game_background.append(game_background_img)
		this.game_field.classList.add('game-field')
		this.game_container.append(this.game_field, game_background)
	}

	generateHouses() {
		const houses_container = document.createElement('div')
		houses_container.classList.add('houses-container')
		const houses_container_img = document.createElement('img')
		houses_container_img.src =
			'https://b2ccdn.coral.ru/content/landing-pages/ny-2025-gaming-host/libs/games/phase0/homes.png'
		houses_container.append(houses_container_img)
		this.game_field.append(houses_container)
	}

	generateDedContainer() {
		this.ded_container = document.createElement('div')
		this.ded_container.classList.add('ded-container')
		this.game_field.append(this.ded_container)
	}

	generateDed(el) {
		if (!el.DOM) {
			const ded = document.createElement('div')
			ded.classList.add('ded')
			ded.id = el.id
			Object.assign(ded.style, {
				top: el.top,
				left: el.left,
				width: el.width,
				height: el.height,
				transform: `translateY(${el.translateY})`,
			})
			setAttributeObject(ded, 'data-state', {
				translateY: el.translateY,
				has_present: el.has_present,
				place: true,
			})
			const ded_img = document.createElement('img')
			ded_img.src = this.getDedImageSrc(el.state)
			if (el.state === 'present-l') {
				ded_img.style.transform = 'rotateY(-180deg)'
			}
			ded.append(ded_img)
			this.ded_container.append(ded)
			el.DOM = ded
			this.animateDed(ded, el)
			this.gameAction(ded, el)
		}
	}

	getDedImageSrc(state) {
		const basePath =
			'https://b2ccdn.coral.ru/content/landing-pages/ny-2025-gaming-host/libs/games/phase0/'
		const images = {
			hello: 'hello_ded.png',
			'present-l': 'present_ded.png',
			'present-r': 'present_ded.png',
			happy: 'happy_ded.png',
		}
		return `${basePath}${images[state] || 'hello_ded.png'}`
	}

	animateDed(ded, el) {
		let isClicked = false

		gsap.to(ded, {
			duration: this.animations.dedAppear.duration,
			y: 0,
			opacity: 1,
			onComplete: () => {
				const disappearTimeout = setTimeout(() => {
					if (!isClicked) {
						this.hideDed(ded, el)
					}
				}, this.animations.dedStay.duration * 1000)

				ded.addEventListener(
					'click',
					() => {
						isClicked = true
						clearTimeout(disappearTimeout)
					},
					{ once: true }
				)
			},
		})
	}

	hideDed(ded, el) {
		gsap.to(ded, {
			duration: this.animations.dedDisappear.duration,
			ease: this.animations.hideMoroz,
			y: el.translateY,
			opacity: 0,
			onComplete: () => {
				delete el.DOM
				ded.remove()
			},
		})
	}

	scores() {
		const el = this.scoreField.querySelector('[data-score]')
		el.textContent = this.present_count
	}

	scoreBoxes() {
		if (this.present_count > 0) {
			const el = this.scoreField.querySelector('.presents')
			const box = document.createElement('div')
			box.classList.add('present-icon')
			box.innerHTML = `<img src="./img/gift.png">`
			el.append(box)
		}
	}

	renderDed() {
		let currentIndex = 0
		const interval = setInterval(() => {
			if (this.present_count === 10) {
				clearInterval(interval)
				this.options.onComplete()
				return
			}
			this.generateDed(window.find_ded_spodarkom[currentIndex])
			currentIndex = (currentIndex + 1) % window.find_ded_spodarkom.length
		}, this.animations.intervalBetweenDeds * 1000)
		this.generateStopButton(interval)
	}

	gameAction(ded, el) {
		if (ded && el) {
			ded.addEventListener('click', () => {
				const ded_data = getAttributeObject(ded, 'data-state')
				if (ded_data.has_present) {
					this.present_count++
					this.scores()
					this.scoreBoxes()
				}
				this.hideDed(ded, el)
			})
		}
	}
}

const host = document.querySelector('#serch-present-game')
new FindDedGame(host)
