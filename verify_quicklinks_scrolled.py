from playwright.sync_api import sync_playwright, expect
import os

def verify(page):
    print("Navigating to homepage...")
    page.goto("http://localhost:3000")

    # Wait for the homepage to load
    page.wait_for_selector(".hero__title")

    # Locate the "Smart Contracts" heading
    smart_contracts_heading = page.get_by_role("heading", name="Smart Contracts")
    expect(smart_contracts_heading).to_be_visible()

    # Scroll to the element
    smart_contracts_heading.scroll_into_view_if_needed()

    # Verify the structure: Heading should be inside a DIV, not an Anchor
    heading_element = smart_contracts_heading.element_handle()
    parent_tag = page.evaluate("(element) => element.parentElement.tagName", heading_element)

    if parent_tag == "A":
        raise Exception("Heading is directly inside an Anchor tag, text selection will be blocked!")

    # Take screenshot of the viewport
    screenshot_path = "/home/jules/verification/verification_scrolled.png"
    os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)
    page.screenshot(path=screenshot_path)
    print(f"Screenshot saved to {screenshot_path}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        finally:
            browser.close()
