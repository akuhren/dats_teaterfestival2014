#!/opt/local/bin/perl

use 5.016;

my $file = $ARGV[0];

open (MYFILE, ">>$file.new") or die "Could not open $file.\n";

		

while (<>) {
	if(/w-embed w-video/) {
		<>;
		<>;	
		my $new_tag = "<video width=\"100%\" height=\"240\" controls>\n".
	    		   	  "<source src=\"video-url\" type=\"video/mp4\">\n".
	  			   	  "Your browser does not support the video tag.\n".
	  			   	  "</video>";
		$_ = $new_tag;
	}
	print MYFILE $_ or die "Could not print to file.\n";
}
close (MYFILE); 

rename($file, "$file.old") or
        die "Could not rename ".$ARGV[0]." to ".$ARGV[0].".old.\n";

rename("$file.new", $file) or
        die "Could not rename $file.new to $file.\n";
