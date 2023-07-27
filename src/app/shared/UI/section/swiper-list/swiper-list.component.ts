import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { IProduct } from 'src/app/shared/model/interface';
import SwiperCore, { Swiper, SwiperOptions, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Virtual]);
@Component({
  selector: 'app-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss'],
})
export class SwiperListComponent implements AfterViewInit, OnInit {
  @Input() listProduct$!: Observable<IProduct[]>;
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
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }
}
