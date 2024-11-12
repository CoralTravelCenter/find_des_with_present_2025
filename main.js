import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";
import './style.scss'
import {
  getAttributeObject,
  getRandomElement,
  setAttributeObject
} from "./usefuls.js";

gsap.registerPlugin(CustomEase);

const hide_moroz = CustomEase.create("myEase", "0.550, 0.085, 0.680, 0.530");

class FindDedGame {
  constructor(hostElement, options = {
    autoStart: true,
    onReady: () => {
    },
    onComplete: () => {
    }
  }) {
    this.options = options
    this.host = hostElement
    this.game_container = null
    this.ded_container = null
    this.game_field = null
    this.present_count = 10
    this.generateGameContainer()
    this.generateGameField()
    this.generateHouses()
    this.generateDedContainer()
    this.generateDed()
    this.gameAction()
  }

  generateGameContainer() {
    this.game_container = document.createElement('div')
    this.game_container.classList.add('game-container')
    this.game_container.setAttribute('data-search-game', true)
    this.host.append(this.game_container)
  }

  generateGameField() {
    this.game_field = document.createElement('div')
    const game_background = document.createElement('div');
    const game_background_img = document.createElement('img')
    game_background_img.src = './img/BG.png';
    game_background.classList.add('game-background')
    game_background.append(game_background_img)
    this.game_field.classList.add('game-field')
    this.game_container.append(this.game_field)
    this.game_container.append(game_background)
  }

  generateHouses() {
    const houses_container = document.createElement('div');
    houses_container.classList.add('houses-container')
    const houses_container_img = document.createElement('img')
    houses_container_img.src = './img/homes.png';
    houses_container.append(houses_container_img)
    this.game_field.append(houses_container)
  }

  generateDedContainer() {
    const ded_container = document.createElement('div');
    ded_container.classList.add('ded-container')
    this.game_field.append(ded_container)
    this.ded_container = ded_container
  }

  generateDed() {
    const createDedInterval = setInterval(() => {
      if (this.present_count === 10) {
        clearInterval(createDedInterval)
        this.options.onComplete()
        return
      }
      const el = getRandomElement(window.find_ded_spodarkom)

      const ded = document.createElement('div');
      ded.classList.add('ded')
      ded.id = el.id
      ded.style.top = el.top
      ded.style.left = el.left
      ded.style.width = el.width
      ded.style.height = el.height
      ded.style.transform = `translateY(${el.translateY})`
      setAttributeObject(ded, 'data-state', {
        translateY: el.translateY,
        has_present: el.has_present,
        place: true
      })
      const ded_img = document.createElement('img');
      switch (el.state) {
        case 'hello':
          ded_img.src = './img/hello_ded.png'
          break
        case 'present-l':
          ded_img.src = './img/present_ded.png'
          ded_img.style.transform = 'rotateY(-180deg)'
          break
        case 'present-r':
          ded_img.src = './img/present_ded.png'
          break
        case 'happy':
          ded_img.src = './img/happy_ded.png'
          break
      }
      ded.append(ded_img)
      window.find_ded_spodarkom.find(item => {
        if (item.id === ded.id) console.log(item)
      })
      this.ded_container.append(ded)

      gsap.to(ded, {
        duration: .3,
        y: 0,
        opacity: 1
      })
    }, 1000)
  }

  gameAction() {
    this.ded_container.addEventListener('click', (e) => {
      const ded = e.target.closest('div');
      const ded_data = getAttributeObject(ded, 'data-state')
      if (ded_data.has_present) {
        this.present_count++
      }
      gsap.to(ded, {
        y: ded_data.translateY,
        opacity: 0,
        duration: .3,
        ease: hide_moroz,
        onComplete: () => {
          ded.remove()
        }
      })
    })
  }

  start() {
    // Game should start
  }

  destroy() {
    // do cleanup if needed
  }
}

const host = document.getElementById('#serch-present-game')
new FindDedGame(host, {
  onComplete: () => {
    console.log('Bum')
  }
})


