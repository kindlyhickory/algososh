import {DELAY_LOW, TEST_URL} from "../../src/constants/constants";
import {CIRCLE_CLASS_SELECTOR} from "../../src/constants/testing-constants";

describe('fibonacci-page visited correctly', () => {
    before(() => {
        cy.visit(`${TEST_URL}/fibonacci`);
    })

    it("button disabled if input empty", () => {
        cy.get("input").should("be.empty");
        cy.get("button").should("be.disabled");
    })

    it("fibonacci number renders correctly", () => {
        const i = 6;
        const fibonacciArr = [1, 1, 2, 3, 5, 8, 13];
        const color = "rgb(0, 50, 255)";

        cy.get("input").type(i);
        cy.get('button').should("not.be.disabled");
        cy.get("button[type='submit']").click();
        for (let j = 0; j <= i; j++) {
            cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index) => {
                cy.get($el).contains(fibonacciArr[index]);
                cy.get($el).should("have.css", "border-color", color);
            })
            cy.wait(DELAY_LOW);
        }
    })
})