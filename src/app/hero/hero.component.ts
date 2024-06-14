import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  images = [
    {
      url: '/Ecommerce-project/assets/images/store1.jpg',
      title: 'Effortlessly Blend Comfort & Style!',
      description:
        'Effortlessly blend comfort and style with our Casual & Everyday collection, featuring cozy sweaters, versatile denim, laid-back tees, and relaxed-fit joggers for your everyday adventures',
    },
    {
      url: '/Ecommerce-project/assets/images/store2.jpg',
      title: 'Explore Our Diverse Collection!',
      description:
        'Transform your wardrobe with our premium selection of elegant and stylish pieces. Perfect for every occasion, our collection ensures you always look your best.',
    },
    {
      url: '/Ecommerce-project/assets/images/store3.jpg',
      title: 'Discover The Allure Of Fashion Reinvented!',
      description:
        'Dive into a world of style with our latest collection! Shop now and redefine your wardrobe narrative!',
    },
  ];
  currentSlide = 0;

  constructor() {}

  ngOnInit(): void {}

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.images.length) % this.images.length;
  }
}
