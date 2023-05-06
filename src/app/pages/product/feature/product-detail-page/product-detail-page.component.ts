import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { Swiper, SwiperOptions, Virtual } from 'swiper';

// install Swiper modules
SwiperCore.use([Virtual]);
import { SwiperComponent } from 'swiper/angular';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent implements AfterViewInit {
  valueCounter: number = 1;
  slidesPerView: number = 6;
  isStart!: boolean;
  isActiveArrow!: boolean;
  isEnd!: any;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: this.slidesPerView,
    spaceBetween: 15,
    slidesPerGroup: 6, // Set number of slides to be grouped together
  };
  slideNext() {
    this.swiper?.swiperRef.slideNext();
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isEnd = this.swiper.swiperRef.isEnd;
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isEnd = this.swiper.swiperRef.isEnd;
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }

  onCountPlus(num: number) {
    this.valueCounter = num + 1;
  }
  onCountMinus(num: number) {
    if (this.valueCounter !== 1) {
      this.valueCounter = num - 1;
    }
  }

  ngAfterViewInit(): void {
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }
}
