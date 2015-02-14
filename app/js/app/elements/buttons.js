/**
 * Buttons Init
 */
function buttons_init()
{
    // Properties
    var list = [];

    // Events
    $(window).on("app_init", init);
    $(window).on("app_scroll", scroll);

    /**
     * Init
     * @param $e
     */
    function init($e)
    {
        // Generate Tweens
        generate_tweens();

        // Init User Interface
        init_ui();
    }

    /**
     * Init User Interface
     */
    function init_ui()
    {
        // Mouse Events
        $(".btn").mouseenter(function()
        {
            for(var i=0, l=list.length; i<l; i++)
            {
                if(this == list[i].btn)
                {
                    list[i].tl.tweenTo(1.1);
                    return
                }
            }
        });
        $(".btn").mouseleave(function()
        {
            for(var i=0, l=list.length; i<l; i++)
            {
                if(this == list[i].btn)
                {
                    list[i].tl.play();
                    return;
                }
            }
        });
        // Scroll Buttons
        $(".btn").click(function()
        {
            for(var i=0, l=list.length; i<l; i++)
            {
                if(this == list[i].btn)
                {
                    list[i].tl.play();
                    scroll_to_page($(this).attr("href"));
                    return false;
                }
            }
        });
    }

    /**
     * Generate Tweens
     */
    function generate_tweens()
    {
        list = [];
        $.each( $(".btn"), function($i, $btn)
        {
            // Properties
            var obj =
            {
                parent: $($btn).parent().parent().attr("id"),
                tl: new TimelineMax({paused:true}),
                btn: $btn
            };

            // Home Button
            if($($btn).attr("href") == "#projects")
            {
                obj.parent = "home";
            }

            // Project Button
            var left = "50%";
            if($($btn).attr("href") == "#contact")
            {
                left = "20%";
            }

            // Tween
            obj.tl.add( TweenMax.fromTo( $btn, .9,{ css:{boxShadow:shadow_1, left:"120%", scale:1.1} }, { css:{boxShadow:shadow_1, left:left, scale:1.1}, ease:ea_o }), 0, "in");
            obj.tl.add( TweenMax.fromTo( $btn, .5, { css:{boxShadow:shadow_1, scale:1.1} }, { css:{boxShadow:shadow_0, scale:1}, ease:ea_io}), 1.1);

            // List
            list[$i] = obj;
        });
    }

    /**
     * Scroll
     * @param $e
     */
    function scroll($e)
    {
        for(var i=0, l=list.length; i<l; i++)
        {
            if($e.section_in == list[i].parent)
            {
                list[i].tl.play();
            }
            else
            {
                list[i].tl.reverse();
            }
        }
    }
}
buttons_init();