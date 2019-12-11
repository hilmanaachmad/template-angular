import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import 'd3';
// import 'nvd3';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import {CardRefreshDirective} from './card/card-refresh.directive';
import {CardToggleDirective} from './card/card-toggle.directive';
import { CardComponent } from './card/card.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParentRemoveDirective} from './elements/parent-remove.directive';
// import {SqueezeBoxModule} from 'squeezebox';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../spinner/spinner.component';
import {ModalAnimationComponent} from './modal-animation/modal-animation.component';
import {ModalBasicComponent} from './modal-basic/modal-basic.component';
import {ToastyModule} from 'ng2-toasty';
import {AnimatorModule} from 'css-animator';
import {SelectOptionService} from './elements/select-option.service';
import {DataFilterPipe} from './elements/data-filter.pipe';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';

import {TodoService} from './todo/todo.service';
import {ClickOutsideModule} from 'ng-click-outside';
import {HorizontalTimelineModule} from "./horizontal-timeline/horizontal-timeline.module";

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
      PaginationModule.forRoot(),
      ToastyModule.forRoot(),
      AnimatorModule,
      ScrollToModule.forRoot(),
      ClickOutsideModule,
      HorizontalTimelineModule
  ],
  declarations: [
      AccordionAnchorDirective,
      AccordionLinkDirective,
      AccordionDirective,
      ToggleFullscreenDirective,
      CardRefreshDirective,
      CardToggleDirective,
      ParentRemoveDirective,
      CardComponent,
      SpinnerComponent,
      ModalAnimationComponent,
      ModalBasicComponent,
      DataFilterPipe
  ],
  exports: [
      AccordionAnchorDirective,
      AccordionLinkDirective,
      AccordionDirective,
      ToggleFullscreenDirective,
      CardRefreshDirective,
      CardToggleDirective,
      ParentRemoveDirective,
      CardComponent,
      SpinnerComponent,
      NgbModule,
      PaginationModule,
      FormsModule,
      ReactiveFormsModule,
      ModalBasicComponent,
      ModalAnimationComponent,
      ToastyModule,
      AnimatorModule,
      DataFilterPipe,
      ScrollToModule,
      ClickOutsideModule,
      HorizontalTimelineModule
  ],
  providers: [
      MenuItems,
      TodoService,
      SelectOptionService
  ]
})
export class SharedModule { }
