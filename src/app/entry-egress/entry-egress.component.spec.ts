import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryEgressComponent } from './entry-egress.component';

describe('EntryEgressComponent', () => {
  let component: EntryEgressComponent;
  let fixture: ComponentFixture<EntryEgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryEgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
