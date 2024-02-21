import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TestFontWeigthResizerDirectiveComponent } from "./testFontWeightResizer.component";
import { FontWeigthResizerDirective } from "../../fontWeightResizer.directive";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TestFontWeigthResizerDirective", () => {
  let fixture: ComponentFixture<TestFontWeigthResizerDirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestFontWeigthResizerDirectiveComponent, FontWeigthResizerDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TestFontWeigthResizerDirectiveComponent);
    fixture.detectChanges();
  });

  it("should font-weight to be 'bold'", () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const fontWeight = h2.style.fontWeight;

    expect(fontWeight).toEqual('bold')
  });
});
