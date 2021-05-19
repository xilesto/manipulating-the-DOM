(function () {
  const sections = [
    {
      id: "part1",
      title: "Introduction",
      content: `Before reading about the various chart patterns in this book, it is wise to review
      the performance of the stock market during the period. Figure 1 shows a
      monthly price chart of the Standard & Poor’s 500 stock index. Beginning in
      mid-1991, you can see that the market moved up at a leisurely pace, pausing
      during much of 1994, and then resuming the climb at a steeper angle in 1995.
      The index stumbled in August 1998 and made lower lows for 2 more months
      before continuing upward, peaking in March 2000, and signaling an end to the
      bull market. The move capped a rise of 418% from the start of the period.
      After that, the downhill bear run began, reaching a low in October 2002, for a
      decline measuring 51%. The index bounced once but made a higher low in
      March 2003, signaling a trend change. Thus, the October low marked the end
      of the bear market.
      What does all this mean? The bear market measures from March 24,
      2000, to October 10, 2002—about 2.5 years long. For data collection purposes,
      the bull market is everything else, about 11 years long. That covers the
      period I used to search for chart patterns in this edition.`,
    },
    {
      id: "part2",
      title: "Investing using chart formation",
      content: `I could give a dentist’s drill to any person walking by, but that doesn’t mean I
      would let that person near my teeth. This book is just like that. It gives you the
      tools to invest successfully. It suggests which chart patterns work best and which
      ones to avoid. Whether you can make money using them is entirely up to you.
      I call this book an encyclopedia because that is how I use it. Whenever I
      see a chart pattern forming in a stock I own, or am thinking of buying, I read
      the applicable chapter. The information refreshes my memory about identification
      quirks, performance, and any tips on how I can get in sooner or more
      profitably. Then I search for similar patterns in the same stock (using different
      time scales), and if that does not work, I search for similar patterns in stocks in
      the same industry. I look at them closely to determine if their secrets are
      applicable to the current situation. I try to learn from their mistakes.`,
    },
    {
      id: "part3",
      title: "Chart patterns",
      content: `Shape. The shape of the formation is distinct. It reminds me of chaos
      theory where small disturbances oscillate back and forth, then grow unbounded,
      wreaking havoc. In the stock market, price reaches a new high then
      crosses over and makes a new low, creating the broadening pattern. When you
      draw a trend line across the minor highs and another connecting the minor
      lows, the formation looks like a megaphone.
      Trend lines. The two trend lines drawn across the minor highs and lows
      are important. The top trend line should slope up; the bottom one should
      slope down. The diverging trend lines distinguish the broadening bottom from
      other types of formations, such as the right-angled broadening formation
      (which has one horizontal trend line) or the broadening wedge (both trend
      lines slope in the same direction). So it is important that each trend line has a
      slope that is opposite the other.
      Touches. A broadening bot`,
    },
    {
      id: "part4",
      title: "Trading Tactics",
      content: `Go long at the low. Once you have uncovered a broadening bottom,
      with two minor highs and two minor lows, you can think about trading it.
      When the price bounces off the lower trend line, buy the stock. Sell when
      prices turn down. The downturn may occur as a partial rise partway across the
      formation, or prices may cross completely to the other side, touch the top
      trend line, and head down. Remember, the formation may stage an upward
      breakout, so do not sell too soon and cut your profits short.
      Long stop. In a rising price trend, place a stop-loss order 0.15 below the
      minor low. Should the stock reverse and head down, you will be taken out with
      a small loss. As the stock rises to the opposite side of the formation, move your
      stop upward to 0.15 below the prior minor low. The minor low may act as a
      resistance point, so you will be giving the stock every opportunity to bounce off
      the resistance level before being cashed out.
      Go short at the high. The trading tactic for downward breakouts is the
      same. When prices touch the top trend line and begin moving down, short
      the stock.`,
    },
  ];

  let currentSectionInViewPortId = null;
  let sectionTags = {};
  let navBarItems = {};

  function createNavigationMenu() {
    const navMenu = document.getElementById("navigation_list");

    sections.forEach((section) => {
      // Create anchor tag with section title as inner text
      let link = document.createElement('a');
      let linkText = document.createTextNode(section.title);
      link.appendChild(linkText);
      link.setAttribute('href', `#${section.id}`);

      // Create list item tag and append with link
      let navItem = document.createElement("li");
      navItem.id = `nav-${section.id}`;
      navItem.appendChild(link);

      // Add item to navBarItems (to be used for scrolling event)
      navBarItems[section.id] = navItem;

      // Add the list item to the navigation menu ul
      navMenu.appendChild(navItem);
    });
  }

  function createSections() {
    sections.forEach((section) => {
      // Create section tag and add id
      let sectionTag = document.createElement('section');
      sectionTag.id = section.id;

      // create h2 tag with the section title
      let h2Tag = document.createElement('h2');
      let sectionTitleText = document.createTextNode(section.title);
      h2Tag.appendChild(sectionTitleText);

      // Create p tag with the section content
      let pTag = document.createElement('p');
      let sectionContent = document.createTextNode(section.content);
      pTag.appendChild(sectionContent);

      // append h2 and p to section
      sectionTag.appendChild(h2Tag);
      sectionTag.appendChild(pTag);

      // Add section to sectionTags (to be used for scrolling event)
      sectionTags[section.id] = sectionTag;

      // append section to main
      const main = document.getElementById('main');
      main.appendChild(sectionTag);

    });
  }

  // check if element is currently in ViewPort
  function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
  }
  
  const onScrollHandler = function() {
    sections.forEach((section) => {
      let sectionIsInViewport = isElementInViewport(sectionTags[section.id]);
      let isAlreadyActive = navBarItems[section.id].className.includes('active');

      // section is in viewport, and li is already active, nothing to be done
      if (sectionIsInViewport && isAlreadyActive) return;

      // section is in viewport, and li is not in active state
      if (sectionIsInViewport && !isAlreadyActive) {
        // first, remove active status from previously active li, if it exists
        if (currentSectionInViewPortId) {
          let previouslyActiveLi = document.getElementById(`nav-${currentSectionInViewPortId}`);
          previouslyActiveLi.classList.remove('active');
        }
        // update new li with active status
        let newlyActiveLi = document.getElementById(`nav-${section.id}`);
        newlyActiveLi.className = "active";
        // save active element for next iteration of scroll event
        currentSectionInViewPortId = section.id;
      }
    })
  };

  createNavigationMenu();
  createSections();

  document.addEventListener("DOMContentLoaded", function(event) { 
    window.addEventListener('scroll', onScrollHandler, false);
  });
})();
