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

let tempPopUp = Vue.component('temp-pop-up', {
    template: '#popup-vue',
    data: function () {
        return {
            msg: ""
        }
    },
    methods: {

    },
});
let imagesVue = new Vue({
    el: '#app',
    data: {
        images: images,
        currentImage: images[0],
        newComment: {
            author: '',
            text: '',
            date: (function () {
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
            })(),
        },
    },
    methods: {
        openPopUp(value) {
            this.currentImage = value;
            let popUp = document.querySelector('#pop-up');
            popUp.style.display = "grid";
        },
        closePopUp() {
            let popUp = document.querySelector('#pop-up');
            popUp.style.display = "none";
        },
        addDislike() {
            this.currentImage.dislike += 1;
        },
        addLike() {
            this.currentImage.like += 1;
        },
        addCommentAuthor() {
            let nickname = document.querySelector('#nickname');
            this.newComment.author = nickname.value;
        },
        addCommentText() {
            let review = document.querySelector('#review');
            this.newComment.text = review.value;
        },
        addComment() {
            if (this.newComment.author != '' && this.newComment.text != '') {
            	let tempCommentObj = Object.assign({}, this.newComment);
                images[this.currentImage.id].comments.push(tempCommentObj);
            } else {
                alert('Please write some text');
            }
        },
        addNewImage(event) {
            let fr = new FileReader();
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
            fr.readAsDataURL(event.target.files[0]);
        }
    },
    components: {
        'temp-pop-up': tempPopUp,
    }
});