import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterprisesPage } from './enterprises.page';

describe('EnterprisesPage', () => {
  let component: EnterprisesPage;
  let fixture: ComponentFixture<EnterprisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterprisesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterprisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
