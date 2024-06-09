alter table "public"."User" drop column "emailVerified";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_total_amount_per_month()
 RETURNS TABLE(month timestamp with time zone, total_amount numeric)
 LANGUAGE sql
AS $function$
SELECT
 DATE_TRUNC(
'month'
, 
date
) 
AS
 
month
, 
SUM
(amount) 
AS
 total_amount
FROM
 invoices
GROUP
 
BY
 DATE_TRUNC(
'month'
, 
date
)
ORDER
 
BY
 
month
;
$function$
;


