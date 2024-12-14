import {
    assertSpyCall,
    spy,
} from "https://deno.land/std@0.223.0/testing/mock.ts";
import { correctAnswer } from "../routes/controllers/quizController.js";

Deno.test("correctAnswer should call render with the correct template and data", async () => {
    // Mock `render` function
    const mockRender = spy();

    // Mock `params` object with both `tId` and `qId`
    const mockParams = { tId: "123", qId: "456" };

    // Mock context object
    const context = {
        render: mockRender,
        params: mockParams,
    };

    // Call the function with the mock context
    await correctAnswer(context);

    // Expected data
    const expectedData = {
        results: true,
        topicID: "123",
    };

    // Verify that `render` was called once with the correct arguments
    assertSpyCall(mockRender, 0, {
        args: ["quizResults.eta", expectedData],
    });
});
