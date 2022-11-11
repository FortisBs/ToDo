import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageComponent } from './manage.component';
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  const authServiceMock = {
    currentPage: new Subject<string>()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should pass current page on component init', () => {
    const spy = spyOn(authServiceMock.currentPage, 'next');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('manage');
  });
});
