class animator{
  public document: Document;
  public window: Window;
  public animateElement: Array<HTMLElement> | null;
  public duration: number = 0.5;
  private beforeAnimate: CSSStyleDeclaration | null;
  private afterAnimate: CSSStyleDeclaration | null;
  constructor(document: Document, window: Window,animateElement?: Array<HTMLElement> | null){
      this.document = document;
      this.window = window;
      this.animateElement = animateElement ?? null;
      this.beforeAnimate = null;
      this.afterAnimate = null;

      this.window.addEventListener("scroll",()=>{
          this.animateElement?.forEach(element => {
              if(element.getBoundingClientRect().top < this.window.innerHeight + window.scrollY - 100){
                  element.style.cssText = this.afterAnimate?.cssText ?? '';
                  console.log("animate");
              }
              else{
                  element.style.cssText = this.beforeAnimate?.cssText ?? '';
              }
              console.log({ele: element.getBoundingClientRect().top,window: this.window.innerHeight + window.scrollY});
          });
      })
  }
  addAnimateElement(element?: HTMLElement | null , elements?: Array<HTMLElement> | null){
      if(element != null){
          this.animateElement?.push(element);
      }
      if(elements != null){
          elements.forEach(element => {
              this.animateElement?.push(element);
          });
      }
  }
  /**
   * This function set the animation style for the element that will do before and after animation
   * @param beforeAnimatelistener Apply style to before animation
   * @param afterAnimatelistener Apply style to after animation
   */
  setAnimation(beforeAnimatelistener : (style: CSSStyleDeclaration) => void, afterAnimatelistener : (style: CSSStyleDeclaration) => void,duration?: number){
      this.duration = duration ?? this.duration;
      this.beforeAnimate = this.document.createElement("style").style;
      this.beforeAnimate.transition = `all ${this.duration}s ease`;
      beforeAnimatelistener(this.beforeAnimate);
      this.afterAnimate = this.document.createElement("style").style;
      this.afterAnimate.transition = `all ${this.duration}s ease`;
      afterAnimatelistener(this.afterAnimate);
  }
}

export default animator;