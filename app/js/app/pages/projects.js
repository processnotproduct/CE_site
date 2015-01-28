/**
 * Projects Init
 */
function projects_init()
{
    // Properties
    var $this       = "#projects",
        $holder     = "#projects .holder",
        $previous   = "#projects .holder .btn-previous",
        $next       = "#projects .holder .btn-next",
        $project    = "#projects .holder .project",
        $text       = "#projects .holder .project .text",
        $text_left  = "#projects .holder .project .text-left",
        $text_right = "#projects .holder .project .text-right",
        $img_left   = "#projects .holder .project .img-left",
        $img_right  = "#projects .holder .project .img-right",

        index       = 0,
        length      = 0,
        pro_old     = null,
        dir         = "",

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
        // Properties
        length = $($project).length;
        index = 0;

        // Set Shadows
        TweenMax.set($($holder), {css:{boxShadow:shadow_0}});
        TweenMax.set($($previous), {css:{boxShadow:shadow_0}});
        TweenMax.set($($next), {css:{boxShadow:shadow_0}});

        // Set Positions
        TweenMax.set($($project), {css:{left:"-100%"}});

        // Generate Tweens
        generate_tweens();

        // Init User Interface
        init_ui();

        // Change Project
        change_project(true);
    }

    /**
     * Init User Interface
     */
    function init_ui()
    {
        // Mouse Events - Previous
        $($previous).mouseenter(function()
        {
            TweenMax.to(this,.5, {css:{boxShadow:shadow_1, scale:1.1}, ease:ea_io});
        });
        $($previous).mouseleave(function()
        {
            TweenMax.to(this,.5, {css:{boxShadow:shadow_0, scale:1}, ease:ea_io});
        });
        $($previous).click(function()
        {
            dir = "<";
            index = (index-1 == -1) ? length-1 : index-1;
            change_project(true);
            return false;
        });

        // Mouse Events - Next
        $($next).mouseenter(function()
        {
            TweenMax.to(this,.5, {css:{boxShadow:shadow_1, scale:1.1}, ease:ea_io});
        });
        $($next).mouseleave(function()
        {
            TweenMax.to(this,.5, {css:{boxShadow:shadow_0, scale:1}, ease:ea_io});
        });
        $($next).click(function()
        {
            dir = ">";
            index = (index+1 == length) ? 0 : index+1;
            change_project(true);
            return false;
        });
    }

    /**
     * Generate Tweens
     */
    function generate_tweens()
    {
    }

    /**
     * Change Project
     * @param $bg_color
     */
    function change_project( $bg_color )
    {
        // Direction
        var pos_out, pos_in;
        if(dir == "<" )
        {
            pos_out = "100%";
            pos_in = "-100%";
        }
        else
        {
            pos_out = "-100%";
            pos_in = "100%";
        }

        // Project Old
        if(pro_old != null)
        {
            var pro_out_from    = { css:{ left:"0" }},
                pro_out_to      = { css:{ left:pos_out }, ease:ea_io };
            TweenMax.fromTo( pro_old, 1, pro_out_from, pro_out_to );
        }

        // Project In
        pro_old             = $($project)[index];
        var pro_in_from     = { css:{ left:pos_in }},
            pro_in_to       = { css:{ left:"0" }, ease:ea_io };

        // Tween
        TweenMax.fromTo( pro_old, 1, pro_in_from, pro_in_to );

        // Bg Color
        if($bg_color)
        {
            change_bg_color( $($($project)[index]).data("color") );
        }
    }

    /**
     * Change Bg Color
     * @param $color
     */
    function change_bg_color($color)
    {
        // Background Color
        TweenMax.to( $($holder), 1, {css:{backgroundColor:$color }, ease:ea_io } );
    }

    /**
     * Resize
     * @param $e
     */
    function resize($e)
    {
        // Projects
        $($this).height($e.h);

        // Holder
        var holder = $($holder);
        holder.height($e.h * .8);

        // Project
        var project = $($project);
        project.height($e.h);

        // Left
        $($img_left).height($e.h);
        $($text_left).height($e.h);

        // Right
        $($img_right).height($e.h);
        $($text_right).height($e.h);

        // Text
        $.each($($text), function($i, $t)
        {
            // Text
            var text = $($t);
            var top = (holder.height() - text.height()) * .5 + 70;
            text.css({top:top+"px"});
        });
    }

    /**
     * Scroll
     * @param $e
     */
    function scroll($e)
    {
        if($e.section_in == "projects")
        {
            // Background Color
            change_bg_color( $($($project)[index]).data("color") );
        }
        else if($e.section_out == "projects")
        {
            // Change Project
            if(index != 0)
            {
                index = 0;
                change_project(true);
            }
        }
    }
}
projects_init();