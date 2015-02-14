/**
 * Home Init
 */
function home_init()
{
    // Properties
    var $this       = "#home",
        $holder     = "#home .holder",
        $text       = "#home .holder .text",
        tl;

    // Events
    $(window).on("app_init", init);
    $(window).on("app_resize", resize);
    $(window).on("app_scroll", scroll);

    /**
     * Init
     * @param $e
     */
    function init($e)
    {
        // Generate Tweens
        generate_tweens();
    }

    /**
     * Generate Tweens
     */
    function generate_tweens()
    {
        var lo = $($text+" #logotype");
        var h1 = $($text+" h1");
        var h3 = $($text+" h3");
        var line = $($text+" .line");

        tl = new TimelineMax({paused:true});
        tl.add( TweenMax.fromTo( lo,    .5, {css:{autoAlpha:0, scale:.95, rotationX:50}}, {css:{autoAlpha:1, scale:1, rotationX:0}, ease:ea_o}), .0);
        tl.add( TweenMax.fromTo( h1,    .5, {css:{autoAlpha:0, scale:.95, rotationX:50}}, {css:{autoAlpha:1, scale:1, rotationX:0}, ease:ea_o}), .1);
        tl.add( TweenMax.fromTo( h3,    .5, {css:{autoAlpha:0, scale:.95, rotationX:50}}, {css:{autoAlpha:1, scale:1, rotationX:0}, ease:ea_o}), .2);
        tl.add( TweenMax.fromTo( line,  .5, {css:{autoAlpha:0, scale:.95, rotationX:50}}, {css:{autoAlpha:1, scale:1, rotationX:0}, ease:ea_o}), .3);
    }

    /**
     * Resize
     * @param $e
     */
    function resize($e)
    {
        // Home
        $($this).height($e.h-70);

        // Home Spacer
        $($this+"-spacer").height($e.h-70);

        // Holder
        var holder = $($holder);
        holder.height($e.h-70);

        // Text
        var text = $($text);
        var top = (holder.height() - text.height()) * .5 + 35;
        text.css({top:top+"px"});
    }

    /**
     * Scroll
     * @param $e
     */
    function scroll($e)
    {
        if($e.section_in == "home")
        {
            tl.play();
        }
        else if($e.section_out == "home")
        {
            tl.reverse();
        }
    }
}
home_init();