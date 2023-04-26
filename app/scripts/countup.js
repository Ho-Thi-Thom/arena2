import { CountUp } from "countup.js";

window.countUp = () => {
  document.querySelectorAll(".number_count_up").forEach((item) => {
    var itemNumber = +item.dataset.itemNumberCountUp;
    const countUp = new CountUp(item, itemNumber, {
      enableScrollSpy: true,
    });
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  });
};

document.addEventListener("shopify:section:load", () => {
  countUp();
});
