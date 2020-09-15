import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './components';
import { SafePipe } from './pipes';

@NgModule({
    declarations: [PageNotFoundComponent, SafePipe],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        FlexLayoutModule,
        MaterialModule,
        InfiniteScrollModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        FlexLayoutModule,
        MaterialModule,
        InfiniteScrollModule,
        SafePipe
    ]
})
export class SharedModule {}
