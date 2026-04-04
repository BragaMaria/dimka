


// Объект для хранения данных о машинах
let carsData = {};

// Загрузка данных из JSON
fetch('../assets/database/index.json')
.then(response => response.json())
.then(jsonData => {
carsData = jsonData.all_cars;
console.log('Данные о машинах загружены:', carsData);

// Используем делегирование событий
document.querySelectorAll('.block_mazda_rx7').forEach(card => {
    card.addEventListener('click', (event) => {
        // Открываем попап только если кликнули на изображение
        if (event.target.classList.contains('mazda_rx7')) {
            const carId = card.getAttribute('data-car-id');
            if (carId) {
                openPopup(carId);
            }
        }
    });
    
    // Меняем курсор только для изображений внутри карточки
    const img = card.querySelector('.mazda_rx7');
    if (img) {
        img.style.cursor = 'pointer';
    }
});
})
.catch(error => console.error('Ошибка загрузки данных:', error));


function openPopup(carId) {
    const car = carsData[carId];
    if (!car) {
        console.error(`Данные для ${carId} не найдены`);
        return;
    }

    // Получаем элемент карточки и изображение
    const card = document.querySelector(`[data-car-id="${carId}"]`);
    const imgElement = card.querySelector('.mazda_rx7');
    const imageUrl = imgElement.getAttribute('data-image-src') || imgElement.src;
    

    // Заполняем попап данными
    document.getElementById('popup-title').innerHTML = car.h2;
    document.getElementById('popup-description').innerHTML = car.p;
    
    // Устанавливаем фоновое изображение
    const dialog = document.getElementById('myDialog');
    dialog.style.backgroundImage = `url('${imageUrl}')`;
    dialog.style.backgroundRepeat = 'no-repeat';
    dialog.style.backgroundSize = 'cover';
    dialog.style.backgroundPosition = 'center';

    // Очищаем и заполняем список
    const listElement = document.getElementById('popup-list');
    listElement.innerHTML = '';
    
    if (car.ul && Array.isArray(car.ul)) {
        car.ul.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            listElement.appendChild(li);
        });
    }

    // Открываем попап и блокируем скролл
    dialog.showModal();
    document.body.classList.add('scroll-lock');
}

// Обновленная функция закрытия попапа
function closeDialog() {
    const dialog = document.getElementById('myDialog');
    dialog.close();
    document.body.classList.remove('scroll-lock');
    // Очищаем фоновое изображение при закрытии (опционально)
    // dialog.style.backgroundImage = '';
}

// Закрытие попапа
const dialog = document.getElementById('myDialog');
const dialogCloser = document.querySelector('.closeDialogBtn');

function closeDialog() {
    dialog.close();
    document.body.classList.remove('scroll-lock');
}

// Обработчики событий
dialogCloser.addEventListener('click', closeDialog);

// Закрытие при клике на backdrop
dialog.addEventListener('click', function(event) {
    if (event.target === dialog) {
        closeDialog();
    }
});

// Закрытие по ESC
dialog.addEventListener('cancel', closeDialog);

