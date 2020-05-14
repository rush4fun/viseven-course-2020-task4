//
//  Create classes for making Images and Comments objects
//
class Image {
    constructor(src, width, height, id) {
        this.src = src;
        this.width = width;
        this.height = height;
        this.id = id;
        this.dislike = 0;
        this.like = 0;
        this.comments = [];
        this.wider = function () {
            if (this.width > 480) {
                return true;
            } else {
                return false;
            }
        };
        this.heighter = function () {
            if (this.height > 450) {
                return true;
            } else {
                return false;
            }
        };
    }
    addComments() {
        let commentsInner = document.querySelector('.comments__inner');
        commentsInner.innerHTML = "";
        this.comments.forEach(item => {
            let commentsItem = document.createElement('div');
            commentsItem.classList.add('comments__item');

            let commentsCaption = document.createElement('div');
            commentsCaption.classList.add('comments__caption');
            commentsItem.appendChild(commentsCaption);

            let commentsAuthor = document.createElement('p');
            commentsAuthor.classList.add('comments__author', 'text');
            commentsAuthor.innerHTML = `by ${item.author}`;
            commentsCaption.appendChild(commentsAuthor);

            let commentsDate = document.createElement('p');
            commentsDate.classList.add('comments__date', 'text');
            commentsDate.innerHTML = item.date;
            commentsCaption.appendChild(commentsDate);

            let commentsText = document.createElement('div');
            commentsText.classList.add('comments__text');
            commentsItem.appendChild(commentsText);

            let commentsReview = document.createElement('p');
            commentsReview.classList.add('text');
            commentsReview.innerHTML = item.text;
            commentsText.appendChild(commentsReview);

            return commentsInner.appendChild(commentsItem);;
        })
    }
}
// 
//  Arrays of objects
//  
let img1 = new Image("img/pic1.jpeg", 482, 322, 0);
img1.comments.push({
    author: "Anon93",
    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat.",
    date: "Today 10:21 PM",
});
let img2 = new Image("img/pic2.jpeg", 684, 456, 1);
img2.comments.push({
    author: "Anon93",
    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat.",
    date: "Today 10:21 PM",
}, {
    author: "Anon93",
    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat.",
    date: "Today 10:21 PM",
});
let img3 = new Image("img/pic3.jpeg", 271, 203, 2);
let img4 = new Image("img/pic4.jpeg", 304, 203, 3);
let img5 = new Image("img/pic5.jpeg", 271, 203, 4);
let img6 = new Image("img/pic6.jpeg", 267, 213, 5);
let img7 = new Image("img/pic7.jpeg", 331, 221, 6);
let img8 = new Image("img/pic8.jpeg", 488, 275, 7);

let images = [img1, img2, img3, img4, img5, img6, img7, img8];


Vue.component('temp-pop-up', {
    template: '#popup-vue',
    data: function () {
        return {
            message: ''
        }
    },
    methods: {
    }

})
let imagesVue = new Vue({
    el: '#app',
    data: {
        images,
        newImage,
    },
    computed: {
    },
    methods: {

    }

})
// 
// Simple functions 
// 

// Close Pop-up

let closePopUp = function () {
    let popUp = document.querySelector('#pop-up');
    popUp.style.display = "none";
}
// let closeBtn = document.querySelector('.js-closeBtn');
// closeBtn.addEventListener('click', closePopUp);
// Open Pop-up

let refreshPopUp = function () {
    let popUp = document.querySelector('#pop-up');
    popUp.style.display = "grid";

    let currentId = popUp.dataset.id;

    let popUpDislikes = document.querySelector('.js-popUpDislikes');
    popUpDislikes.innerHTML = images[currentId].dislike;

    let popUpLikes = document.querySelector('.js-popUpLikes');
    popUpLikes.innerHTML = images[currentId].like;

    let popUpNumComments = document.querySelector('.js-popUpNumComments');
    popUpNumComments.innerHTML = `Comments: ${images[currentId].comments.length}`;

    images.forEach(item => {
        if (item.id == currentId) {
            item.addComments();
        }
    });
}
let openPopUp = function () {
    let popUp = document.querySelector('#pop-up');
    popUp.style.display = "grid";

    let currentId = this.dataset.id;
    popUp.dataset.id = currentId;
    let currentImageBlock = images[currentId];

    let popUpImage = document.querySelector('.js-popUpImage');
    popUpImage.src = currentImageBlock.src;

    refreshPopUp();
}
// let jsBlocks = document.querySelectorAll('.js-Block');
// jsBlocks.forEach(item => {
//     item.addEventListener('click', openPopUp);
// })
// 
// Add like/dislike
// 

// Add like

let addLike = function (event) {
    let popUp = document.querySelector('#pop-up');
    event.preventDefault();
    let currentId = popUp.dataset.id;
    images[currentId].like += 1;
    refreshPopUp();
}
// let likeButton = document.querySelector('.js-like');
// likeButton.addEventListener('click', addLike);
// Add dislike
let addDislike = function (event) {
    let popUp = document.querySelector('#pop-up');
    event.preventDefault();
    let currentId = popUp.dataset.id;
    images[currentId].dislike += 1;
    refreshPopUp();
}
// let dislikeButton = document.querySelector('.js-dislike');
// dislikeButton.addEventListener('click', addDislike);

// Add comment

let addCommentPopUp = function () {
    let popUp = document.querySelector('#pop-up');
    let currentId = popUp.dataset.id;
    let nickname = document.querySelector('#nickname');
    let review = document.querySelector('#review');
    event.preventDefault();

    let newDate = function () {
        let date = new Date();

        let day = date.getDate();
        if (day < 10) day = '0' + day;

        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;

        let year = date.getFullYear() % 100;
        if (year < 10) year = '0' + year;

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    let newComment = {
        author: nickname.value,
        text: review.value,
        date: newDate(),
    }

    images[currentId].comments.push(newComment);
    refreshPopUp();
}
// let btnAddNewComment = document.querySelector('.js-btnAddNewComment');
// btnAddNewComment.addEventListener('click', addCommentPopUp);

//  Add new image

let addNewImage = function () {
    var fr = new FileReader();
    fr.onload = function (e) {
        let templateNewImage = document.querySelector('#newImage');
        templateNewImage.src = e.target.result;
        templateNewImage.onload = function () {
            let newId = images.length;
            let newImageSrc = templateNewImage.src;
            let newImageWidth = this.width;
            let newImageheight = this.height;
            let newImage = new Image(newImageSrc, newImageWidth, newImageheight, newId);
            images.push(newImage);
        };
    }
    fr.readAsDataURL(this.files[0]);
}
// let btnAddNewImage = document.querySelector('#load-pic');
// btnAddNewImage.addEventListener('change', addNewImage);