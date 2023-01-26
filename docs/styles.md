## Структура стилей в шаблоне

### Структура
1. [Глобальные правила](#глобальные-правила)
2. [Структура папок и файлов](#структура-папок-и-файлов)
   1. [base](#base)
   2. [components](#components)
   3. [layout](#layout)
   4. [pages](#pages)
   5. [ui](#ui)
   6. [vendors](#vendors)
   7. [app.scss](#app.scss)


### Глобальные правила
* index.scss - подключение только файлов директории текущего уровня, без вложенности (писать стили в этих файлах запрещается). Пример:
  
* запрещена стилизация БЭМ селектора с разбиением элемента/модификатора на части по дефису
  ```scss
       .bem-block {
         &__heading {
            width: em(100);
  
            // ❌ Неправильный формат стилизации 
            &-item {
              font-size: em(20);
            }
         }
         // ✅ Правильный формат стилизации 
         &__heading-item {
              font-size: em(20);
         }
       }
  ```
  ```html
       <div class="bem-block">
         <div class="bem-block__heading">
           <span class="bem-block__heading-item">Some text</span>
         </div>
       </div>
  ```

* Запрещена стилизация по селектору тега (исключение: vendors). В таких случаях необходимо дать тегу клас, соблюдая правила БЭМ, и стилизовать уже бем элемент
  ```scss
    // ❌ Запрещена стилизация по селектору тега 
    .bem-block span {
         width: em(100); 
    }
  ```
  
* Предлагается следующий формат для работы с текстовыми содержимым блока:
  1. Любой БЭМ блок для работы с его текстовым содержимым всегда осуществляет это через БЭМ-элемент - "__font".
  2. Данный элемент содержит в себе только стили связанные с типографией (font-*, line-height, letter-spacing).
  3. Допускается дополнительная стилизация с помощью БЭМ-модификаторов (--accent, --fixed и тд.)
  4. Возможно использование миксинов типографии или прямая запись размеров. (зависит от масштаба проекта)
    ```scss
      .bem-block {
        &__font {
          @include sh300-1u();
            
          // ❌ Запрещена стилизация чего либо кроме типографии
          color: $white;
          
          // ✅ Допускается стилизация через модификатор
          &--accent {
           color: $white;
          }
          
          &--1 {
            @include sh300-3u();
          }
      
          // Пример прямой записи размеров
          &--2 {
            font-size: em(100);
            line-height: 1;
          }
        }
      } 
   ```
   ```html
     <div class="bem-block">
       <div class="bem-block__title">
         <span class="bem-block__font">Some text</span>
       </div>
   
       <div class="bem-block__title">
         <span class="bem-block__font bem-block__font--1">Some text</span>
       </div>
   
       <div class="bem-block__title">
         <span class="bem-block__font bem-block__font--2">Some text</span>
       </div>
     </div>
   ```

### Структура папок и файлов
### base
  1. fonts - подключение семейств шрифтов
  2. typography - перечень всех вариантов типографии на проекте. Существуют следующие варианты работы с ней:
     ```scss
       // Через @mixin
       
       // sh - семейство шрифта
       // 300 - вес начертания
       // 1 - порядковый номер
       // u - модификация
       $typography-h-light: (
         sh300-1u: (
         font-family: $sansHead,
         font-size: 54,
         line-height: 64,
         font-weight: 300,
         letter-spacing: 0,
         text-transform: uppercase,
         ),
       );
        
        // создание миксина через функцию генератор
        // @include typography -  функция генератор
        // 'sh300-1u' -  ключ объекта
        // $typography-h-light - целевой объект
        @mixin sh300-1u { @include typography('sh300-1u', $typography-h-light) };
    
        // Пример использования миксинов (не в данном файле)
       .bem-block {
          &__font {
            @include sh300-1u();
        
            // Варианты размеров
            &--1 {
              @include sh300-2u();
            }
        
            &--2 {
              @include sh300-3u();
            }
          }
       }
     
       // Прямая запись в бем-блоках
       .bem-block {
          &__font {
            font-size: em(140);
            line-height: 1.5;
     
            // Другой вариант для текста
            &--1 {
              font-size: em(70);
              line-height: 1.35;
            }
     
            &--2 {
              font-size: em(50);
              line-height: 1.25;
            }
          }
       }
     ```
     ```html
       <div class="bem-block">
         <div class="bem-block__title">
           <span class="bem-block__font">Some text</span>
         </div>
     
         <div class="bem-block__title">
           <span class="bem-block__font bem-block__font--1">Some text</span>
         </div>
     
         <div class="bem-block__title">
           <span class="bem-block__font bem-block__font--2">Some text</span>
         </div>
       </div>
     ```
3. base.scss - базовые стили для html тегов (не допускается стилизация глобальных тегов с классами)
   ```scss
      button {
        cursor: pointer;
        // ❌ Запрещена стилизация по селектору класса
        &.accent {
          background-color: red;
        }
      }
   ```
4. breakpoint.scss - [bootstrap breakpoint механизм ](https://getbootstrap.com/docs/5.0/layout/breakpoints/) для типичного адаптива
5. mixins.scss - глобальные миксины для проекта
   ```scss
      @mixin hover {
        @media (hover), (min-width: 0\0), (min--moz-device-pixel-ratio: 0) {
          &:hover {
           @content;
          }
        }
      }
   ```
6. normalize.scss - присвоение общих стилей для всех тегов вне зависимости от браузера или платформы. ([что такое normalize](https://htmlacademy.ru/blog/boost/frontend/about-normalize-css))
7. transitions.scss - базовые классы отвечающие за плавность (fade для модальных окон и тд).  
   Примечание: Допустимо нарушение БЭМ методологии по именованию так как классы для transition генерируются на стороне Vue.
   ```scss
     .modal {
       &-enter {
        transform: translateY(100%);
       }
   
       &-enter-to {
         transform: translateY(0);
       }
   
       &-enter-active {
         transition: all $transTime $easeIn;
       }
   
       &-leave {
         transform: translateY(0); 
       }
         
       &-leave-to {
         transform: translateY(100%);
       }
       
       &-leave-active {
         transition: all $transTime $easeOutCubic;
       }
     } 
   ```
8. variables.scss - глобальные переменные для проекта (стиль именования переменных описать - ???)

### components
Стилизация независимых и повторно используемых БЭМ-блоков (не имеет значения есть vue-component или представлен лишь в виде верстки).

### layout
Содержит в себе любое описание шаблона для всех (или группы) страниц

То что является глобальным (пример: header, sidebar (aside) popup обертка - кнопка закрыть и базовое поведение)

### pages
Стили для описания элементов конкретной страницы (вертикальный ритм, позиционирование элементов страницы через bem-mix)
   ```html
      <div class="documents-page">
        <!-- контейнер, позиционирование -->
        <div
          class="documents-page__main"
        >
          <!-- bem-mix -->
          <componentName class="documents-page__block component-block" />
    
          <!-- bem-mix -->
          <AnotherComponent class="documents-page__block component-block" />
        </div>
      </div>
   ```

### ui
 Независимые интерактивные элементы для взаимодействия пользователя со страницей (кнопки, чекбоксы, инпуты). Пример:
  ```scss
  .button {
    padding: 0 em(20);
    color: $colorSecondary;
    text-decoration: none;
    border: 0;
    background: $colorAccent;
    transition: all 0.6s;
    @include hover {
      color: $colorSecondary;
      background: $colorAccentLight;
    }
     
    &__font {
      @include sh300-1u();

      // Варианты размеров
      &--1 {
        @include sh300-2u();
      }
    }
  }
 ```
 ```html
   <button type="button" class="button">
     <span class="button__font button__font--1">Кнопка</span>
   </button>
 ```

 Примечание: Внутри представлены примеры папок группирования UI компонентов (buttons, forms)

### vendors
Переопределение стилей для библиотек и стилизация контента плагинов (WYSIWYG редактор).

Примечание: В связи с "особой" реализацией каждого плагина/библиотеки на эту папку не распространяется часть правил stylelint.

### app.scss
Точка входа стилей
