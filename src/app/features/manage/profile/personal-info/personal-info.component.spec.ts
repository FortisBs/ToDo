import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalInfoComponent } from './personal-info.component';
import { ManageService } from "../../manage.service";

describe('PersonalInfoComponent', () => {
  let component: PersonalInfoComponent;
  let fixture: ComponentFixture<PersonalInfoComponent>;

  const manageServiceMock = {
    getEmail() { return 'someone@email.com' },
    getUsername(): string | undefined { return 'someNickname' },
    saveUsername(username: string) {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalInfoComponent],
      providers: [{ provide: ManageService, useValue: manageServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('property email should receive value from method manageService.getEmail', () => {
    component.ngOnInit();
    expect(component.email).toBe('someone@email.com');
  });

  it('property username should receive value from method manageService.getUsername', () => {
    component.ngOnInit();
    expect(component.username).toBe('someNickname');
  });

  it('property username should receive empty string from ' +
    'method manageService.getUsername if it returns undefined', () => {
    spyOn(manageServiceMock, 'getUsername').and.returnValue(undefined);
    component.ngOnInit();
    expect(component.username).toBe('');
  });

  it('should call manageService.saveUsername on method onSaveUsername', () => {
    const spy = spyOn(manageServiceMock, 'saveUsername');
    component.onSaveUsername();
    expect(spy).toHaveBeenCalledWith(component.username);
  });
});
