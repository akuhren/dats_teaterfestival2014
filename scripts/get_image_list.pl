#!/opt/local/bin/perl

use 5.016;

open (MYFILE, '>>image_log') or "Could not open file.\n";
my $img_str = qx{find .. -iname '*.[pj][pn]g'};

my @img_lst = split /\n/,$img_str;

my $i = 0;
foreach (@img_lst) {
	s/^\.\.\/www\///;
	s/.*(backup).*//;
	if (/^.*(jpg|png)$/i){
		print MYFILE "var image$i = new Image();\nimage$i.src=\"$_\";\n\n";
		$i++;
	}
}

close (MYFILE); 