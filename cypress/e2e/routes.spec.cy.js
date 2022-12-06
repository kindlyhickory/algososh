import {TEST_URL} from "../../src/constants/constants";

describe('app routes works correctly', () => {
    before(() => {
        cy.visit(TEST_URL)
    });
    it('should open recursion page', () => {
        cy.visit(`${TEST_URL}/recursion`);
    })
    it('should open fibonacci page', () => {
        cy.visit(`${TEST_URL}/fibonacci`);
    })
    it('should open sorting page', () => {
        cy.visit(`${TEST_URL}/sorting`);
    })
    it('should open stack page', () => {
        cy.visit(`${TEST_URL}/stack`);
    })
    it('should open queue page', () => {
        cy.visit(`${TEST_URL}/queue`);
    })
    it('should open list page', () => {
        cy.visit(`${TEST_URL}/list`);
    })
})