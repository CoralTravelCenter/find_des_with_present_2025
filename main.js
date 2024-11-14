import {gsap} from "gsap";
import {CustomEase} from "gsap/CustomEase";
import './style.scss'
import {
  getAttributeObject,
  setAttributeObject
} from "./usefuls.js";


(function () {
  window.find_ded_spodarkom = [
    {
      top: "20%",
      left: "8%",
      state: 'happy',
      width: '10%',
      height: '10%',
      translateY: '63%',
      id: 'b1001' // Добавлено поле id
    },
    {
      top: "31%",
      left: "14%",
      state: 'present-l',
      has_present: true,
      width: '15%',
      height: '15%',
      translateY: '57%',
      id: 'b1002' // Добавлено поле id
    },
    {
      top: "39%",
      left: "28%",
      state: 'present-l',
      has_present: true,
      width: '18%',
      height: '18%',
      translateY: '65%',
      id: 'b1003' // Добавлено поле id
    },
    {
      top: "22%",
      left: "37%",
      state: 'hello',
      width: '10%',
      height: '10%',
      translateY: '70%',
      id: 'b1004' // Добавлено поле id
    },
    {
      top: "26%",
      left: "46%",
      state: 'hello',
      width: '13%',
      height: '13%',
      translateY: '60%',
      id: 'b1005' // Добавлено поле id
    },
    {
      top: "27%",
      left: "63%",
      state: 'happy',
      width: '7%',
      height: '7%',
      translateY: '63%',
      id: 'b1006' // Добавлено поле id
    },
    {
      top: "24%",
      left: "72%",
      state: 'hello',
      width: '10%',
      height: '10%',
      translateY: '57%',
      id: 'b1007' // Добавлено поле id
    },
    {
      top: "23%",
      left: "92.5%",
      state: 'happy',
      width: '7%',
      height: '7%',
      translateY: '57%',
      id: 'b1008' // Добавлено поле id
    },
    {
      top: "48%",
      left: "-3%",
      state: 'hello',
      width: '12%',
      height: '12%',
      translateY: '57%',
      id: 'b1009' // Добавлено поле id
    },
    {
      top: "53%",
      left: "11%",
      state: 'present-r',
      has_present: true,
      width: '20%',
      height: '20%',
      translateY: '57%',
      id: 'b1010' // Добавлено поле id
    },
    {
      top: "60%",
      left: "36%",
      state: 'happy',
      width: '20%',
      height: '20%',
      translateY: '57%',
      id: 'b1011' // Добавлено поле id
    },
    {
      top: "59%",
      left: "61%",
      state: 'hello',
      width: '12%',
      height: '12%',
      translateY: '57%',
      id: 'b1012' // Добавлено поле id
    },
    {
      top: "59%",
      left: "78%",
      state: 'present-l',
      has_present: true,
      width: '20%',
      height: '20%',
      translateY: '63%',
      id: 'b1013' // Добавлено поле id
    },
    {
      top: "42%",
      left: "56%",
      state: 'present-r',
      has_present: true,
      width: '12%',
      height: '12%',
      translateY: '50%',
      id: 'b1014' // Добавлено поле id
    },
    {
      top: "33%",
      left: "81%",
      state: 'happy',
      width: '12%',
      height: '12%',
      translateY: '50%',
      id: 'b1015' // Добавлено поле id
    },
  ];
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
      this.scoreField = null
      this.present_count = 0
      this.generateGameContainer()
      this.generateGameField()
      this.generateHouses()
      this.generateDedContainer()
      this.renderDed()
      this.gameAction()
      this.generateScoreField()
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
      element.append(scoreText)
      this.game_field.append(element)
      element.append(presents)
      this.scoreField = element
    }

    generateStopButton(interval) {
      const button = document.createElement('button')
      button.setAttribute('data-end-game', true)
      button.textContent = 'Закончить игру и получить скидку'
      button.addEventListener('click', () => {
        clearInterval(interval);
        this.options.onComplete();
        return;
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

    generateDed(el) {
      if (!el.DOM) {
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
        this.ded_container.append(ded)
        el.DOM = ded
        gsap.to(ded, {
          duration: .3,
          y: 0,
          opacity: 1
        })
        this.gameAction(ded, el)
      }
    }

    scores() {
      const el = this.scoreField.querySelector('[data-score]');
      el.textContent = this.present_count
    }

    scoreBoxes() {
      if (this.present_count > 0) {
        const el = this.scoreField.querySelector('.presents');
        const box = document.createElement('div')
        box.classList.add('present-icon')
        box.innerHTML = `<img src="./img/gift.png">`;
        el.append(box)
      }
    }

    renderDed() {
      let currentIndex = 0; // Индекс текущего элемента

      const interval = setInterval(() => {
        if (this.present_count === 10) {
          clearInterval(interval);
          this.options.onComplete();
          return;
        }
        // Вызываем this.generateDed() только для одного элемента в секунду
        this.generateDed(window.find_ded_spodarkom[currentIndex]);

        // Переходим к следующему элементу
        currentIndex = (currentIndex + 1) % window.find_ded_spodarkom.length;

        // Обнуляем currentIndex, если он достиг конца массива
        if (currentIndex === 0) {
          currentIndex = 0; // Начинаем заново
        }

      }, 1000); // Интервал 1
      this.generateStopButton(interval)
    }

    gameAction(ded, el) {
      if (ded !== undefined && el !== undefined) {
        ded.addEventListener('click', (e) => {
          const ded_data = getAttributeObject(ded, 'data-state')
          if (ded_data.has_present) {
            this.present_count++
            this.scores()
            this.scoreBoxes()
          }
          gsap.to(ded, {
            y: ded_data.translateY,
            opacity: 0,
            duration: .3,
            ease: hide_moroz,
            onComplete: () => {
              ded.remove()
              delete el.DOM
            }
          })
        })
      }
    }
  }
})();