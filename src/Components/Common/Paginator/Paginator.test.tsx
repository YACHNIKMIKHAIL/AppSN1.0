import React from "react";
import {create} from 'react-test-renderer';
import {Paginator} from "./Paginator";


describe("Paginator component", () => {
    test("Pages count is 11 but should be be showed onle 10", () => {
        const component = create(<Paginator onPageChanged={()=>{}} pageSize={1} currentPage={1} totalCount={11} />);
        const root=component.root
        // eslint-disable-next-line testing-library/await-async-query
        let spans=root.findAllByType("span")
        expect(spans.length).toBe(10)
    });

    test("If pages count more that 10 button NEXT should be present", () => {
        const component = create(<Paginator onPageChanged={()=>{}} pageSize={1} currentPage={1} totalCount={11} />);
        const root=component.root
        // eslint-disable-next-line testing-library/await-async-query
        let button=root.findAllByType("button")
        expect(button.length).toBe(1)
    });
});