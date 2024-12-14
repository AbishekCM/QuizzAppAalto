import { assertEquals } from "https://deno.land/std@0.223.0/assert/mod.ts";
import { getData } from "../routes/controllers/topicsQuestionsController.js";

Deno.test("getData should return question and an empty topicID from request body", async () => {
    // Mock request with form data
    const mockRequest = {
        body: () => ({
            value: new Map([
                ["question_text", "What is the capital of France?"],
            ]),
        }),
    };

    // Call the function with the mocked request
    const result = await getData(mockRequest);

    // Expected result
    const expected = {
        question: "What is the capital of France?",
        topicID: "",
    };

    // Assert the result matches the expected output
    assertEquals(result, expected);
});
