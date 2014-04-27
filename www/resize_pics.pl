#!/opt/local/bin/perl

use 5.016;

my @sizes = (57, 72, 114, 120, 144);
my $file = $ARGV[0];

unless (-e $file){
	die("No such file: ".$file);
}

foreach my $size (@sizes){
	my $x = "x";
	(my $new_file = $file) =~ s/\.png/-$size$x$size\.png/;

	qx{convert $file -scale $size$x$size $new_file};
}
