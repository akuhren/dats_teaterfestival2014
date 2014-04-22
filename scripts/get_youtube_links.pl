#!/opt/local/bin/perl

use 5.016;
use utf8;
use Text::Unidecode;

my $file = $ARGV[0];

open (MYFILE, ">>$file.new") or die "Could not open $file.\n";

my $subpath = "videos/";
my $fullpath = "../www/".$subpath;

eval{ mkpath($fullpath) };

while (<>) {
	if(/w-embed w-video/) {
		$_ = <>;
	    <>;
		
		s/%2F/\//ig;
		s/%3F/?/ig;
		s/%3D/=/ig;
		s/%3A/:/ig;

		s/.*;url=(http:..www.youtube.com.watch...(?:\w|-)+).*/$1/i;
		chomp $_;
		
		my $title = qx{youtube-dl -e $_};
		chomp $title;
		
		my $title = unidecode($title);
		$title =~ s/ /_/gi;
		$title =~ s/"//gi;
		$title =~ s/'//gi;

		print "Saving $_ to '$fullpath$title.mp4' ...\n";
		# print MYFILE $_ or die "Could not print to file.\n";
		qx{youtube-dl -o '$fullpath$title.mp4' -f mp4 -f worstvideo $_};
		print "Download complete!\n\n";
		
		my $new_tag = "<video width=\"100%\" height=\"240\" controls>\n".
	    	 "<source src=\"$subpath$title.mp4\" type=\"video/mp4\">\n".
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
